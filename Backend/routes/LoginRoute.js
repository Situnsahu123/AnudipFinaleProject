const { db } = require("../db/database");
const express = require("express");
const { logroutre, getAllUsers ,updatePasswordByEmail } = require("../controllers/LoginControiiller.js");
const LoginRoute = express.Router();

LoginRoute.post("/login", logroutre);
LoginRoute.get("/users", getAllUsers)
LoginRoute.put('/users/password', updatePasswordByEmail)

module.exports = LoginRoute;
