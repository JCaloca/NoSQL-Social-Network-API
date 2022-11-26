const router = require("express").Router();

// importing user controllers
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../../controllers/userController");

// route api/users to get all users and create a user
router.route("/").get(getUsers).post(createUser);

// api/users/:userId to get user by ID and update
router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
