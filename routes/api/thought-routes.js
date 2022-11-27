const router = require("express").Router();

// importing thought controllers
const {
  createThought,
  getThoughts,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

module.exports = router;
