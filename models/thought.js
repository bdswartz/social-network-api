const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema(
  {
      thoughtText: {
        type: String,
        required: true,
        max: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true
      },
      reactions: [reactionSchema]
    },    
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
