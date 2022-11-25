const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/social-network", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Exporting mongoose connection
module.exports = mongoose.connection;
