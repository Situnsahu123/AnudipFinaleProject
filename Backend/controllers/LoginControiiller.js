const { db } = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.logroutre = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute("SELECT * FROM UserTable WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res
          .status(200)
          .json({
            message: "User logged in successfully!",
            user: { id: user.id, name: user.name, email: user.email },
          });
      } else {
        res.status(401).json({ error: "Invalid email or password." });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed.", details: error.message });
  }

  const token = jwt.sign(
    {email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
      message: "User logged in successfully!",
      user: {email: user.email },
      token,
    });

};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};
