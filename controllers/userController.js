const { User } = require('../models');

module.exports = {
  // API Route - /api/users
  // GET route - get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST route - create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);

      res.json(dbUserData);
    } catch (err) {
      if (err.code === 11000) {
        res.status(500).json({ message: 'This username is taken.' });
      } else if (err.errors.email) {
        res.status(500).json({ message: 'Please enter a valid email.' });
      } else {
        res.status(500).json(err);
      }
    }
  },
  // API Route - /api/users/:userId
  // GET route - get single user by its ID and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID.' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT route - update a user by its ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID.' });
      }

      const dbUserData = await User.findById(req.params.userId);

      res.json({
        message: 'Successfully updated users information.',
        updatedUser: dbUserData,
      });
    } catch (err) {
      if (err.errors.email) {
        res.status(500).json('Please enter a valid email.');
      } else {
        res.status(500).json(err);
      }
    }
  },
  // DELETE route - remove user by its ID
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndDelete(req.params.userId);
      console.log(dbUserData);

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with that ID.' });
      }

      res.json({
        message: 'Successfully deleted user.',
        deletedUser: dbUserData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // API Route - /api/users/:userId/friends/:friendId
  // POST route - add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        {
          new: true,
          runValidators: true,
        }
      );

      res.json({
        message: 'Successfully added friend.',
        user: dbUserData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE route - remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $pull: { friends: req.params.friendId },
      });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID.' });
      }

      const dbUserData = await User.findById(req.params.userId);

      res.json({
        message: 'Successfully deleted friend.',
        user: dbUserData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
