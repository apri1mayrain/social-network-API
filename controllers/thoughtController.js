const { Thought, User } = require('../models');

module.exports = {
  // API route - /api/thoughts
  // GET route - get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST route - create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      // Push the newly created thought ID to the associated user's thoughts array field
      await User.findByIdAndUpdate(req.body.userId, {
        $push: { thoughts: dbThoughtData._id },
      });

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // API Route - /api/thoughts/:thoughtId
  // GET route - get a single thought by its ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT route - update a thought by its ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID.' });
      }

      const dbThoughtData = await Thought.findById(req.params.thoughtId);

      res.json({
        message: 'Successfully updated thought.',
        user: dbThoughtData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE route - remove thought by its ID
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);

      console.log(dbThoughtData);

      // Pull/remove a thought from user's array of thoughts
      await User.findOneAndUpdate(
        { 
            username: dbThoughtData.username,
            $pull: { thoughts: dbThoughtData._id },
        },
      );

      res.json({
        message: 'Successfully deleted thought.',
        user: dbThoughtData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // API route - /api/thoughts/:thoughtId/reactions
  // POST route - create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      res.json({
        message: 'Successfully created reaction.',
        thought: dbThoughtData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE route - pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      console.log(req.body.reactionId);
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $pull: { reactions: { reactionId: req.body.reactionId } },
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID.' });
      }

      const dbThoughtData = await Thought.findById(req.params.thoughtId);

      res.json({
        message: 'Successfully deleted reaction.',
        thought: dbThoughtData,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
