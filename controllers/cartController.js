const Cart = require('../models/cartModel');

exports.getCartByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.getCartByUser(userId);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשליפת הסל' });
  }
};

exports.addToCart = async (req, res) => {
  const { user_id, menu_item_id, quantity } = req.body;
console.log('📥 נתונים שהתקבלו מהקליינט:', req.body);

  try {
    const existing = await Cart.findCartItem(user_id, menu_item_id);

    if (existing.length > 0) {
      await Cart.updateCartQuantity(user_id, menu_item_id, quantity);
      res.status(200).json({ message: 'עודכן בסל בהצלחה' });
    } else {
      await Cart.insertCartItem(user_id, menu_item_id, quantity);
      res.status(201).json({ message: 'נוסף לסל בהצלחה' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'שגיאה בהוספה לסל', error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    await Cart.updateQuantity(id, quantity);
    res.json({ message: 'הכמות עודכנה בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בעדכון הכמות' });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.deleteItem(id);
    res.json({ message: 'הפריט הוסר מהסל' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקה מהסל' });
  }
};
