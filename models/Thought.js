// Thought Model (includes Reaction Schema)
// Import Mongoose ODM to create schemas and model
const mongoose = require('mongoose');
// Import Day.js to format timestamp
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat);
// Import Reaction Schema
const reactionSchema = require('./Reaction');

// Thought Schema
const thoughtSchema = new mongoose.Schema({
    // thoughtText: string, required, must be between 1 and 280 characters
    thoughtText: { 
        type: String, 
        required: true, 
        minLength: 1, 
        maxLength: 280 
    },
    // createdAt: date, set default value to the current timestamp, use a getter method to format the timestamp on query
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: (createdAt) => dayjs(createdAt).format('MMMM Do, YYYY [at] h:m a')
    },
    // username (the user that created this thought): string, required
    username: { 
        type: String, 
        required: true 
    },
    // reactions (these are like replies): array of nested documents, or subdocuments, created with the reactionSchema
    reactions: [reactionSchema]
    },
    // Enable getters and virtuals
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create Thought model with the thought schema
const Thought = mongoose.model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;