// Requiring User Model
const { User } = require("../models");

module.exports = {
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Get all users
  getUsers(req, res) {
    User.find({})
      // populate Users friends field
      .populate({ path: "friends", select: "-__v" })
      // populate a Users thoughts field
      .populate({ path: "thoughts", select: "__v" })
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "friends", select: "-__v" })
      .populate({ path: "thoughts", select: "-__v" })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by ID
  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
