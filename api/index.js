const express = require("express");

const api = express();

api.get("/", (req, res) => {
  return res.json({ version: "1.0.1" });
});

module.exports = api;
