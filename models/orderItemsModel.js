const db = require('../db');

exports.insert = async (order_id, menu_item_id, quantity, price_at_time) => {
  await db.execute(
    `INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_time)
     VALUES (?, ?, ?, ?)`,
    [order_id, menu_item_id, quantity, price_at_time]
  );
};

exports.findByOrderId = async (orderId) => {
  const [items] = await db.execute(
    `SELECT * FROM order_items WHERE order_id = ?`,
    [orderId]
  );
  return items;
};

exports.update = async (id, quantity, price_at_time) => {
  await db.execute(
    `UPDATE order_items SET quantity = ?, price_at_time = ? WHERE id = ?`,
    [quantity, price_at_time, id]
  );
};

exports.remove = async (id) => {
  await db.execute(`DELETE FROM order_items WHERE id = ?`, [id]);
};
