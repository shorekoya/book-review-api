const express = require("express");
const router = express.Router();
const books = require("../data/booksdb");

// ✅ 1. Get all books
router.get("/", (req, res) => {
  return res.status(200).json(books);
});

// ✅ 2. Get book by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// ✅ 3. Get books by Author
router.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author
  );
  res.status(200).json(results);
});

// ✅ 4. Get books by Title
router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.values(books).filter((book) =>
    book.title.toLowerCase().includes(title)
  );
  res.status(200).json(results);
});

// ✅ 5. Get book review
router.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({ message: "No reviews found for this book" });
  }
});

// ✅ Task 10: Get all books using async callback
router.get("/", async (req, res) => {
  try {
    const getBooksAsync = () =>
      new Promise((resolve) => setTimeout(() => resolve(books), 100));
    const allBooks = await getBooksAsync();
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// ✅ Task 11: Get book by ISBN using Promises
router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    const book = books[isbn];
    book ? resolve(book) : reject("Book not found");
  })
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(404).json({ message: err }));
});

// ✅ Task 12: Get books by Author
router.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author
  );
  res.status(200).json(results);
});

// ✅ Task 13: Get books by Title
router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.values(books).filter((book) =>
    book.title.toLowerCase().includes(title)
  );
  res.status(200).json(results);
});

// ✅ Task 5: Get book reviews
router.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({ message: "No reviews found for this book" });
  }
});

module.exports = router;
