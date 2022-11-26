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
};
