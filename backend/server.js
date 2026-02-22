const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3001;

const pool = new Pool({
  host: "db",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.send("Database time: " + result.rows[0].now);
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
