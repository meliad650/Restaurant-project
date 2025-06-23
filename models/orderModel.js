const db = require('../db');

exports.create = (user_id, email, total_price, branch_id, delivery_method, status, notes) => {
  return db.execute(
    `INSERT INTO orders (user_id, email, total_price, branch_id, delivery_method, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, email, total_price, branch_id, delivery_method, status, notes]
  );
};

exports.getAll = () => {
  return db.execute('SELECT * FROM orders');
};

exports.getByUserId = (userId) => {
  return db.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
};

exports.updateStatus = (userId, status) => {
  return db.execute(
    'UPDATE orders SET status = ? WHERE user_id = ?',
    [status, userId]
  );
};

exports.delete = (id) => {
  return db.execute('DELETE FROM orders WHERE id = ?', [id]);
};
