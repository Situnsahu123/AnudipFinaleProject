const { db } = require("../db/database");

// ✅ Block a user
const blockUser = async (req, res) => {
  const { blocker_email, blocked_email } = req.body;

  if (!blocker_email || !blocked_email) {
    return res.status(400).json({ message: "Both blocker and blocked emails are required" });
  }

  try {
    // Ensure table exists before inserting
    await db.execute(`
      CREATE TABLE IF NOT EXISTS blocked_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blocker_email VARCHAR(255) NOT NULL,
        blocked_email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if user is already blocked
    const [existing] = await db.query(
      "SELECT * FROM blocked_users WHERE blocker_email = ? AND blocked_email = ?",
      [blocker_email, blocked_email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already blocked" });
    }

    // Insert blocked user
    await db.query(
      "INSERT INTO blocked_users (blocker_email, blocked_email) VALUES (?, ?)",
      [blocker_email, blocked_email]
    );

    res.json({ message: "User blocked successfully" });
  } catch (err) {
    console.error("❌ Error blocking user:", err.message);
    res.status(500).json({ message: "Error blocking user" });
  }
};

// ✅ Get all blocked users for a specific blocker
const getBlockedUsers = async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const [rows] = await db.query(
      "SELECT blocked_email FROM blocked_users WHERE blocker_email = ?",
      [email]
    );

    // ✅ FIX HERE — return plain array, not wrapped object
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching blocked users:", err.message);
    res.status(500).json({ message: "Error fetching blocked users" });
  }
};

// ✅ Unblock a user
const unblockUser = async (req, res) => {
  const { blocker_email, blocked_email } = req.body;

  if (!blocker_email || !blocked_email) {
    return res.status(400).json({ message: "Both emails are required" });
  }

  try {
    const [result] = await db.query(
      "DELETE FROM blocked_users WHERE blocker_email = ? AND blocked_email = ?",
      [blocker_email, blocked_email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User was not blocked" });
    }

    res.json({ message: "User unblocked successfully" });
  } catch (err) {
    console.error("❌ Error unblocking user:", err.message);
    res.status(500).json({ message: "Error unblocking user" });
  }
};

// ✅ Check if a user is blocked
const checkIfBlocked = async (req, res) => {
  const { blocker_email, blocked_email } = req.body;

  if (!blocker_email || !blocked_email) {
    return res.status(400).json({ message: "Both emails are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM blocked_users WHERE blocker_email = ? AND blocked_email = ?",
      [blocker_email, blocked_email]
    );

    const isBlocked = rows.length > 0;
    res.json({ isBlocked });
  } catch (err) {
    console.error("❌ Error checking blocked status:", err.message);
    res.status(500).json({ message: "Error checking blocked status" });
  }
};

module.exports = {
  blockUser,
  getBlockedUsers,
  unblockUser,
  checkIfBlocked,
};
