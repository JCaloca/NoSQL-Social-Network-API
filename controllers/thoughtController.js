// Requiring models User and Though
const { User, Thought } = require("../models");

module.exports = {
  // Create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: newThought._id } },
          { new: true }
        );
      })
      .then((newThought) =>
        !newThought
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json(newThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get All thoughts
  getThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get Thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(dbThought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update Thought by ID
  updateThoughtbyId(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(dbThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete Thought by ID
  deleteThought(req, res) {
    // find thought by ID
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThought) =>
        // if Thought is found find associated User and delete/$pull thought from User Document
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted but no user with this id!",
            })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Reaction Controllers

  // Create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(dbThought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete reaction by ID
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(dbThought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
