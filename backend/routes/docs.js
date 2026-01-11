const express = require("express");
const auth = require("../middleware/auth");
const Document = require("../models/Document");

const router = express.Router();

// Create new doc
router.post("/", auth, async (req, res) => {
  try {
    const doc = await Document.create({
      ownerId: req.user.id,
      title: req.body.title || "Untitled"
    });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// List user's docs
router.get("/", auth, async (req, res) => {
  try {
    res.json(
      await Document.find({ ownerId: req.user.id }).sort({ updatedAt: -1 })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single doc
router.get("/:id", auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update doc
router.put("/:id", auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    if (req.body.title !== undefined) doc.title = req.body.title;
    if (req.body.content !== undefined) doc.content = req.body.content;

    res.json(await doc.save());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
