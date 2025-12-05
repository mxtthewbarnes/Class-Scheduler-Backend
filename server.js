// code/backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const courseRouter = require("./routes/courseRouter");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware first
app.use(cors());
app.use(express.json());

// mount router
app.use("/api/courses", courseRouter);

// health routes
app.get("/", (_req, res) => {
  res.send("Backend API is running");
});

app.get("/whoami", (_req, res) => {
  res.send("server.js is running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
