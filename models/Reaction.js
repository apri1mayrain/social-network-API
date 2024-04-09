// Reaction Schema (schema ONLY)
// Import Mongoose ODM to create schemas and model
const mongoose = require('mongoose');
// Import Day.js to format timestamp
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat);

// This is the 'reactions' field subdocument schema in the Thought model
const reactionSchema = new mongoose.Schema({
    // Since there is a custom reactionId, disable the _id field
    _id: false,
    // reactionId: use Mongoose's ObjectId data type, default value is set to a new ObjectId
    reactionId: { 
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId,
    },
    // reactionBody: string, required, 280 character maximum
    reactionBody: { 
        type: String, 
        required: true, 
        maxLength: 280 
    },
    // username: string, required
    username: { 
        type: String, 
        required: true 
    },
    // createdAt: date, set default value to the current timestamp, use a getter method to format the timestamp on query
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: (createdAt) => dayjs(createdAt).format('MMMM Do, YYYY [at] h:m a')
    },
    },
    // Enable getters
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Export the Reaction Schema
module.exports = reactionSchema;