const { db } = require("../db/database")
const express = require("express")
const { logroutre , verifyToken } = require("../controllers/LoginControiiller.js");
const LoginRoute = express.Router();


LoginRoute.post('/login', logroutre)

LoginRoute.get("/check", verifyToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});


module.exports = LoginRoute;    