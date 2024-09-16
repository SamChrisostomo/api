const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  content: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
  publication: { type: mongoose.Schema.Types.ObjectId, ref: "Publication" },
});

module.exports = mongoose.model("Comments", commentsSchema);