const express = require("express")
const { Signuproutre } = require("../controllers/SignupController");
const SignupRoute = express.Router();

SignupRoute.post('/signup',Signuproutre )


module.exports = SignupRoute;