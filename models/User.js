// User Model
// Import Mongoose ODM to create schema and model
const mongoose = require('mongoose');

// User Schema
// Schema settings: 
const userSchema = new mongoose.Schema(
  {
    // username: string, unique, required, trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // email: string, required, unique, must match a valid email address (look into Mongoose's matching validation)
    email: {
      type: String,
      required: true,
      unique: true,
      match: [ 
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
        'Please enter a valid email address.'
      ],
    },
    // thoughts: array of `_id` values referencing the `Thought` model
    thoughts: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // friends: array of `_id` values referencing the `User` model (self-reference)
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  // Enable virtuals
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create User model with the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;