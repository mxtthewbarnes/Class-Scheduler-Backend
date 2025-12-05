const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//course Router mount
const courseRouter = require("./routes/courseRouter");
app.use("/api/courses", courseRouter);

// test route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Example DB route
app.get("/api/courses", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
