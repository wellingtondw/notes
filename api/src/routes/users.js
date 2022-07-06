const express = require("express");
const routes = express.Router();
const User = require("../models/user");

routes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  try {
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Error on register user" });
  }
});

module.exports = routes;
