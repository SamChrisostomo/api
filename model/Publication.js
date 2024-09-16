const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
});

module.exports = mongoose.model("Publication", publicationSchema);