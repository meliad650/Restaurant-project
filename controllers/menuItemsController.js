const Menu = require('../models/menuItemsModel');

exports.getAllMenuItems = async (req, res) => {
  try {
    const rows = await Menu.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בקבלת המוצרים' });
  }
};

exports.getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await Menu.getById(id);
    if (!row) {
      return res.status(404).json({ error: 'המוצר לא נמצא' });
    }
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בקבלת המוצר' });
  }
};

exports.createMenuItem = async (req, res) => {
  const { name, description, price, image_url } = req.body;
  try {
    const result = await Menu.create({ name, description, price, image_url });
    res.status(201).json({ id: result.insertId, name, description, price, image_url });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בהוספת מוצר' });
  }

};

exports.updateMenuItemPrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const result = await Menu.updatePrice(id, price);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'מוצר לא נמצא' });
    }
res.json({ id, price });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בעדכון הסטטוס של המוצר' });
  }
};


exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  console.log('ID למחיקה:', id); // ✨ שורת בדיקה
  try {
    const result = await Menu.remove(id);
    console.log('תוצאת מחיקה:', result); // ✨ בדיקה נוספת
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'מוצר לא נמצא' });
    }
    res.json({ message: 'המוצר נמחק בהצלחה' });
  } catch (err) {
    console.error('שגיאה בשרת:', err); // ✨ שורת לוג חשובה
    res.status(500).json({ error: 'שגיאה במחיקת המוצר' });
  }
};

