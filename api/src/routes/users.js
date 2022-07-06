const { Router } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN;

const User = require("../models/user");

const routes = express.Router();

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

routes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Password or Email incorrect" });
    }

    user.isCorrectPassword(password, (_, same) => {
      if (!same) {
        return res.status(401).json({ error: "Password or Email incorrect" });
      }

      const token = jwt.sign({ email }, secret, { expiresIn: "7d" });
      res.json({ user, token });
    });
  } catch (err) {
    res.status(500).json({ error: "Server Internal Error" });
  }
});

module.exports = routes;
