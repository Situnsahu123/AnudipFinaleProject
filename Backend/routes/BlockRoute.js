const express = require("express");
const Blockrouter = express.Router();
const {
  blockUser,
  getBlockedUsers,
  unblockUser,
  checkIfBlocked,
} = require("../controllers/BlockController");

Blockrouter.post("/block", blockUser);
Blockrouter.get("/blocked/:email", getBlockedUsers);
Blockrouter.delete("/unblock", unblockUser);
Blockrouter.post("/isblocked", checkIfBlocked);

module.exports = Blockrouter;
