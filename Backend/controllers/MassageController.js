const { db } = require("../db/database");
require("dotenv").config();

exports.SendMessage = async (req, res) => {
  try {
    const { sender_email, receiver_email, message_text } = req.body;

    if (!sender_email || !receiver_email || !message_text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db.execute(
      "INSERT INTO messages (sender_email, receiver_email, message) VALUES (?, ?, ?)",
      [sender_email, receiver_email, message_text]
    );

    res.status(201).json({
      message: "Message sent successfully",
      messageData: {
        id: result.insertId,
        sender_email,
        receiver_email,
        message: message_text,
      },
    });
  } catch (err) {
    console.error("❌ Error sending message:", err.message);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Fetch messages
exports.GetMessagesByEmails = async (req, res) => {
  try {
    const { sender_email, receiver_email } = req.params;

    if (!sender_email || !receiver_email) {
      return res.status(400).json({ error: "Both sender and receiver emails are required" });
    }

    const [rows] = await db.execute(
      `SELECT * FROM messages
       WHERE (sender_email = ? AND receiver_email = ?)
          OR (sender_email = ? AND receiver_email = ?)
       ORDER BY created_at ASC`,
      [sender_email, receiver_email, receiver_email, sender_email]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching messages:", err.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
