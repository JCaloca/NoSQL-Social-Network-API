const router = require("express").Router();

// importing user controllers
const { createUser, getUsers } = require("../../controllers/userController");

// route api/users to get all users and create a user
router.route("/").get(getUsers).post(createUser);

module.exports = router;
