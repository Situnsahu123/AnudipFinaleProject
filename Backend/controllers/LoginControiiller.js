const { db } = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.logroutre = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const [rows] = await db.execute("SELECT * FROM UserTable WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed.", details: error.message });
  }
};

exports.getAllUsers = async (req, res) =>{
  try {
    const [rows] = await db.execute("SELECT name, email FROM UserTable");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users.", details: error.message });
  }
}

exports.updatePasswordByEmail = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    const [result] = await db.execute(
      'UPDATE UserTable SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  }  catch (error) {
     console.error('Update Password Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



