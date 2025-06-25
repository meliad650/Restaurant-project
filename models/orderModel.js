const db = require('../db');

exports.create = (
  user_id,
  email,
  total_price,
  branch_id,
  delivery_method,
  status,
  notes,
  selected_sauces,
  address
) => {
  const saucesJson = JSON.stringify(selected_sauces || []);
  const addressJson = JSON.stringify(address || {});
  return db.execute(
    `INSERT INTO orders (user_id, email, total_price, branch_id, delivery_method, status, notes, selected_sauces, address)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, email, total_price, branch_id, delivery_method, status, notes, saucesJson, addressJson]
  );
};




exports.getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM orders');
  return rows;
};


exports.getByUserId = async (userId) => {
  const [rows]= await db.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
  return rows;
};

exports.updateStatus = (userId, status) => {
  return db.execute(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, userId]
  );
};

exports.delete = (id) => {
  return db.execute('DELETE FROM orders WHERE id = ?', [id]);
};

exports.deleteAll = async () => {
  await db.execute('DELETE FROM order_items');
  await db.execute('DELETE FROM orders');
};

