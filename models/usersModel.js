const db = require('../db');

exports.getAll = async () => {
  const [users] = await db.execute('SELECT * FROM users');
  return users;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows;
};
