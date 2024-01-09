const { user, thought } = require("../models");



const userController = {

  // Getting all users.
  getAllUser(req, res) {
    user.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Getting a single user by id.
  getUserById({ params }, res) {
    user.findOne({ _id: params.id })
      .populate({
        path: "thought",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Unable to locate user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Creating a user.
  createUser({ body }, res) {
    user.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // Updating a user by id.
  updateUser({ params, body }, res) {
    user.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Unable to locate user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // Deleting a user.
  deleteUser({ params }, res) {
    user.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Unable to locate user with this id!" });
        }
        // BONUS: get ids of user's `thoughts` and delete them all
        // $in to find specific things
        return thought.deleteMany({ _id: { $in: dbUserData.thought } });
      })
      .then(() => {
        res.json({ message: "User deleted as well as any associated thoughts!" });
      })
      .catch((err) => res.json(err));
  },

  // Adding friends.
  addFriend({ params }, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Unable to locate user with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // Deleting friends.
  removeFriend({ params }, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Unable to locate user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = userController;