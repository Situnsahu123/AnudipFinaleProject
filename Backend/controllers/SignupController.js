const { db } = require("../db/database");
const bcrypt = require('bcrypt');

exports.Signuproutre = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.execute(
      `INSERT INTO UserTable (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword] // Store the hashed password
    );
    res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Email already exists." });
    } else {
      res.status(500).json({ error: "Signup failed.", details: err.message });
    }
  }
};

exports.DeleteAccount = async (req,res) =>{
  try {
    const userEmail = req.params.email;

    const [result] = await db.execute(
      `DELETE FROM UserTable WHERE email = ?`,
      [userEmail]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Account deletion failed.", details: err.message });
  }
}