const mongoose = require("mongoose");

const cloudSchema = new mongoose.Schema({
  profileImage: String,
});

module.exports = mongoose.model("Image", cloudSchema);
