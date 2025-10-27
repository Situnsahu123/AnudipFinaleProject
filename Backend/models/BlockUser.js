const { db } = require("../db/database.js");

const BlockTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS blocked_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blocker_email VARCHAR(255) NOT NULL,
        blocked_email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ messages table created (if not existed).");
  } catch (err) {
    console.error("❌ Error creating messages table:", err.message);
  }
};

module.exports = BlockTable;
