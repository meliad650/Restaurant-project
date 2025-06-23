const db = require('../db');

exports.getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM menu_items');
  return rows;
};

exports.remove = async (id) => {
  const [result] = await db.execute('DELETE FROM menu_items WHERE id = ?', [id]);
  return result;
};
