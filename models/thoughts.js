//Requiring mongoose.
const { Schema, model, Types } = require("mongoose");
//Requiring the date format.
const dateFormat = require("../utils/dateFormat");

//Connecting reaction schema to thoughts.
const reactionSchema = new Schema(
  {
//This is setting a custom ID.
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minLength: 1,
    },

    username: {
      type: String,
      required: true,
    },

    //This is for the timestamp.
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//This is the thought schema.
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "True",
      maxlength: 280,
      minlength: 1,
    },

    //This is for the timestamp.
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },

    username: {
      type: String,
      required: true,
    },

//This will connect reactions to thoughts.
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//Getting a reaction count.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Creating the thought model using the thoughtSchema
const Thought = model("Thought", ThoughtSchema);

//Exporting the thought model.
module.exports = Thought;