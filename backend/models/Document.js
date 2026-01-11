const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "Untitled" },
  content: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Document", DocumentSchema);