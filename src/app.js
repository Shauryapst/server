require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "POST, GET, OPTIONS, DELETE", // Allow the specified methods
    allowedHeaders: "Content-Type, x-requested-with", // Allow the specified headers
    maxAge: 86400, // Set the max age for preflight requests (in seconds)
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "sessionToken");
  next();
});

require(`./routes`)("/api", app);

module.exports = app;
