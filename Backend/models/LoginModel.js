const { db } = require("../db/database.js");

const DoctorTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS DoctorTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log("✅ UserTable created (if not existed).");
  } catch (err) {
    console.error("❌ Error creating DoctorTable:", err.message);
  }
};

module.exports = DoctorTable;
