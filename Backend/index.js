const express = require("express");
const cors = require("cors");

const pool = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("KenaKata Backend is running!");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`KenaKata backend running on http://localhost:${PORT}`);
});