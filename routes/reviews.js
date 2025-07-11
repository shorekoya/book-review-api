const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const reviews = require("../data/reviews");

const SECRET_KEY = "mySecretKey123"; // Use env in real apps

// ✅ Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = user;
    next();
  });
}

// ✅ Get all reviews (public)
router.get("/", (req, res) => {
  res.json(reviews);
});

// ✅ Add a review (auth required)
router.post("/", authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const newReview = {
    id: reviews.length + 1,
    title,
    content,
    username: req.user.username,
  };
  reviews.push(newReview);
  res.status(201).json({ message: "Review added", review: newReview });
});

// ✅ Update a review (auth required)
router.put("/:id", authenticateToken, (req, res) => {
  const review = reviews.find((r) => r.id == req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  if (review.username !== req.user.username)
    return res.status(403).json({ message: "Not allowed" });

  review.title = req.body.title || review.title;
  review.content = req.body.content || review.content;
  res.json({ message: "Review updated", review });
});

// ✅ Delete a review (auth required)
router.delete("/:id", authenticateToken, (req, res) => {
  const index = reviews.findIndex((r) => r.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Review not found" });
  if (reviews[index].username !== req.user.username)
    return res.status(403).json({ message: "Not allowed" });

  reviews.splice(index, 1);
  res.json({ message: "Review deleted" });
});

module.exports = router;
