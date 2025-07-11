const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Routes
const generalRoutes = require("./routes/general");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");

app.use("/api", generalRoutes);
app.use("/api", userRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
