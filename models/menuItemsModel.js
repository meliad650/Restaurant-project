const db = require('../db');

exports.getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM menu_items WHERE status = 'פעיל'"
  );
  return rows;
};


exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM menu_items WHERE id = ?', [id]);
  return rows[0];
};

  exports.create = async ({ name, description, price, image_url }) => {
  const [result] = await db.query(
    'INSERT INTO menu_items (name, description, price, image_url, status) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, image_url, 'פעיל']
  );
  return result;
};


exports.updatePrice = async (id, price) => {
  const [result] = await db.query(
    'UPDATE menu_items SET price = ? WHERE id = ?',
    [price, id]
  );
  return result;
};


exports.remove = async (id) => {
  const [result] = await db.query(
    "UPDATE menu_items SET status = 'לא קיים' WHERE id = ?",
    [id]
  );
  return result;
};

