const { db } = require("../db/database")
const express = require("express")

const {SendMessage,GetMessagesByEmails } = require('../controllers/MassageController.js')
const ChatRoute = express.Router();

ChatRoute.post('/sendmessage',SendMessage)
ChatRoute.get("/getmessages/:sender_email/:receiver_email", GetMessagesByEmails);


module.exports = ChatRoute;


