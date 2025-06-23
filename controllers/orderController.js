const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const { user_id, email, total_price, branch_id, delivery_method, status, notes } = req.body;
  try {
    const result = await Order.create(user_id, email, total_price, branch_id, delivery_method, status, notes);
    res.status(201).json({ message: 'הזמנה נוצרה', order_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה ביצירת הזמנה' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בקבלת הזמנות' });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.getByUserId(userId);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בקבלת הזמנות' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || typeof status !== 'string') {
    return res.status(400).json({ message: 'סטטוס לא תקין' });
  }

  try {
    const result = await Order.updateStatus(id, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'הזמנה לא נמצאה' });
    }

    res.json({ message: 'סטטוס ההזמנה עודכן בהצלחה' });
  } catch (err) {
    console.error('שגיאה בעדכון סטטוס:', err.message);
    res.status(500).json({ message: 'שגיאה בעדכון סטטוס ההזמנה' });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.delete(id);
    res.json({ message: 'הזמנה נמחקה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקת הזמנה' });
  }
};
