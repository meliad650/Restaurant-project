const db = require('../db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM menu_items');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM menu_items WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async ({ name, description, price }) => {
  const [result] = await db.query(
    'INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)',
    [name, description, price]
  );
  return result;
};

exports.update = async (id, { name, description, price }) => {
  const [result] = await db.query(
    'UPDATE menu_items SET name = ?, description = ?, price = ? WHERE id = ?',
    [name, description, price, id]
  );
  return result;
};

exports.remove = async (id) => {
  const [result] = await db.query('DELETE FROM menu_items WHERE id = ?', [id]);
  return result;
};
