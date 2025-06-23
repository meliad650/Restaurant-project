const db = require('../db');

exports.getCartByUser = async (userId) => {
  const [cart] = await db.execute(
    `SELECT c.id, c.menu_item_id, m.name, m.price, m.image_url, c.quantity
     FROM cart c
     JOIN menu_items m ON c.menu_item_id = m.id
     WHERE c.user_id = ?`,
    [userId]
  );
  return cart;
};

exports.findCartItem = async (user_id, menu_item_id) => {
  const [existing] = await db.execute(
    'SELECT * FROM cart WHERE user_id = ? AND menu_item_id = ?',
    [user_id, menu_item_id]
  );
  return existing;
};

exports.updateCartQuantity = async (user_id, menu_item_id, quantity) => {
  await db.execute(
    'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND menu_item_id = ?',
    [quantity, user_id, menu_item_id]
  );
};

exports.insertCartItem = async (user_id, menu_item_id, quantity) => {
  await db.execute(
    'INSERT INTO cart (user_id, menu_item_id, quantity) VALUES (?, ?, ?)',
    [user_id, menu_item_id, quantity]
  );
};

exports.updateQuantity = async (id, quantity) => {
  await db.execute('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id]);
};

exports.deleteItem = async (id) => {
  await db.execute('DELETE FROM cart WHERE id = ?', [id]);
};
