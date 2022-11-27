const router = require("express").Router();

// importing thought controllers
const {
  createThought,
  getThoughts,
  getThoughtById,
} = require("../../controllers/thoughtController");

// /api/thoughts  route to get all thought and create a new thought
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getThoughtById);

module.exports = router;
