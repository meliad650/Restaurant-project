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
  const { name, description, price } = req.body;
  try {
    const result = await Menu.create({ name, description, price });
    res.status(201).json({ id: result.insertId, name, description, price });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה ביצירת מוצר' });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const result = await Menu.update(id, { name, description, price });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'מוצר לא נמצא' });
    }
    res.json({ id, name, description, price });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בעדכון המוצר' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Menu.remove(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'מוצר לא נמצא' });
    }
    res.json({ message: 'המוצר נמחק בהצלחה' });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה במחיקת המוצר' });
  }
};
