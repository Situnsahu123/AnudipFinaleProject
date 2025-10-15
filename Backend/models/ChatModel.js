const { db } = require("../db/database.js");

const ChatTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_email VARCHAR(255) NOT NULL,
        receiver_email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ messages table created (if not existed).");
  } catch (err) {
    console.error("❌ Error creating messages table:", err.message);
  }
};

module.exports = ChatTable;
