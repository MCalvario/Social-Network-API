//Requiring mongoose.
const { Schema, model } = require("mongoose");

//This is the user schema.
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Username is Required",
    },

    email: {
      type: String,
      unique: true,
      required: "Username is Required",
      //Using the email regex to validate an email address.
      match: [/.+@.+\..+/],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Getting the total number of friends.
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//This create the user model using the userSchema.
const User = model("User", UserSchema);

//Exporting the user model.
module.exports = User;