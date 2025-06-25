const db = require('../db');

exports.insertUser = async (teudat_zehut, email, first_name, address, role,password) => {
  
    const [result] = await db.execute(
    `INSERT INTO users (teudat_zehut, email, first_name, address, role,password)
     VALUES (?, ?, ?, ?, ?,?)`,
    [teudat_zehut, email, first_name, address, role,password]
  );
  return result.insertId;
};




exports.getUserByEmail = async (email) => {
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return users[0];
};

exports.getPasswordByUserId = async (userId) => {
  const [rows] = await db.execute('SELECT * FROM passwords WHERE user_id = ?', [userId]);
  return rows[0];
};
