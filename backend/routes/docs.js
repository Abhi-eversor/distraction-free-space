const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};


router.get("/", auth, async (req, res) => {
  let doc = await Document.findOne({ userId: req.userId });

  if (!doc) {
    doc = await Document.create({ userId: req.userId });
  }

  res.json(doc);
});


router.post("/", auth, async (req, res) => {
  const { content } = req.body;

  const doc = await Document.findOneAndUpdate(
    { userId: req.userId },
    { content },
    { new: true, upsert: true }
  );

  res.json(doc);
});

module.exports = router;
