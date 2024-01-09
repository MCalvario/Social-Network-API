const { thought, user } = require("../models");

const thoughtController = {
//Getting all thoughts
  getAllThought(req, res) {
    thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbthoughtData) => res.json(dbthoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //Getting thoughts by ID
  getthoughtById({ params }, res) {
    thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
        res.status(404).json({ message: "Unable to locate thought with this id!" });
        return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

//Creating thoughts.
  createthought({ params, body }, res) {
    thought.create(body)
      .then(({ _id }) => {
        return user.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
           res.status(404).json({ message: "Thought created but unable to locate user with this id!" });
            return;
        }

        res.json({ message: "Success!" });
      })
      .catch((err) => res.json(err));
  },

  // Updating Thoughts by id
  updatethought({ params, body }, res) {
    thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          res.status(404).json({ message: "Unable to locate thought with this id!" });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Deleting Thoughts
  deletethought({ params }, res) {
    thought.findOneAndDelete({ _id: params.id })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          return res.status(404).json({ message: "Unable to locate thought with this id!" });
        }

        // Removing thought ids.
        return user.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but unable to locate thought with this id!" });
        }
        res.json({ message: "Success!" });
      })
      .catch((err) => res.json(err));
  },

  // Adding reactions
  addReaction({ params, body }, res) {
    thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Unable to locate thought with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Deleting reactions
  removeReaction({ params }, res) {
    thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;