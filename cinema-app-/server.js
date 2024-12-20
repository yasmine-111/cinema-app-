const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const favoritesRoutes = require('./routes/favorites');

dotenv.config(); // Loads environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure that the server can handle JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/movies", require("./routes/movieroutes"));
app.use("/api/planning", require("./routes/planningroutes"));
app.use('/api/favorites', require('./routes/favorites') );
app.use('/api/reservations', require('./routes/reservations'));

// Simple test route to ensure the server is running
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
