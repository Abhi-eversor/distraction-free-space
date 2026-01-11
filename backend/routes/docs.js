const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const auth = require("../middleware/requireAuth");

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Document.find({
      ownerId: req.user.id
    }).sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to load notes" });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const note = await Document.create({
      ownerId: req.user.id,
      title: req.body.title || "Untitled",
      content: ""
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Document.findOne({
      _id: req.params.id,
      ownerId: req.user.id
    });

    if (!note) return res.status(404).json({ message: "Not found" });

    res.json(note);
  } catch {
    res.status(500).json({ message: "Failed to load note" });
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Document.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      { content: req.body.content },
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to save note" });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Document.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

module.exports = router;
