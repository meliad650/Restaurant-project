const OrderItems = require('../models/orderItemsModel');

exports.addItemToOrder = async (req, res) => {
  const { order_id, menu_item_id, quantity, price_at_time } = req.body;
  try {
    await OrderItems.insert(order_id, menu_item_id, quantity, price_at_time);
    res.status(201).json({ message: 'הפריט נוסף להזמנה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בהוספת פריט להזמנה' });
  }
};

exports.getItemsByOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const items = await OrderItems.findByOrderId(orderId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בקבלת פריטי ההזמנה' });
  }
};

exports.updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { quantity, price_at_time } = req.body;
  try {
    await OrderItems.update(id, quantity, price_at_time);
    res.json({ message: 'הפריט עודכן בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בעדכון פריט' });
  }
};

exports.deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    await OrderItems.remove(id);
    res.json({ message: 'הפריט נמחק מההזמנה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקת פריט מההזמנה' });
  }
};
