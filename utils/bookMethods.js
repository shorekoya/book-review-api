const axios = require("axios");

// Task 10: Get all books (Async callback style)
async function getAllBooks() {
  try {
    const response = await axios.get("http://localhost:5000/api");
    console.log("All Books:", response.data);
  } catch (error) {
    console.error("Error getting all books:", error.message);
  }
}

// Task 11: Search by ISBN (Promises)
function getBookByISBN(isbn) {
  axios
    .get(`http://localhost:5000/api/isbn/${isbn}`)
    .then((response) => {
      console.log("Book by ISBN:", response.data);
    })
    .catch((error) => {
      console.error("Error getting book by ISBN:", error.message);
    });
}

// Task 12: Search by Author (Async/Await)
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/author/${author}`
    );
    console.log("Books by Author:", response.data);
  } catch (error) {
    console.error("Error getting books by author:", error.message);
  }
}

// Task 13: Search by Title (Async/Await)
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/title/${title}`
    );
    console.log("Books by Title:", response.data);
  } catch (error) {
    console.error("Error getting books by title:", error.message);
  }
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
