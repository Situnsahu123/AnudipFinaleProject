const express = require("express");
const { Signuproutre , DeleteAccount} = require("../controllers/SignupController");

const SignupRoute = express.Router();

SignupRoute.post("/signup", Signuproutre);
SignupRoute.delete("/deleteAccount/:email",DeleteAccount)


module.exports = SignupRoute;
