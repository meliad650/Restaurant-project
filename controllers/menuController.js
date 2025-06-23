const db = require('../db');

exports.getMenu = async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM menu_items');
  res.json(rows);
};

const Menu = require('../models/menuModel');

exports.getMenuItems = async (req, res) => {
  try {
    const rows = await Menu.getAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Menu.remove(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'מוצר לא נמצא' });
    }

    res.json({ message: 'המוצר נמחק בהצלחה' });
  } catch (err) {
    console.error('שגיאה במחיקה:', err);
    res.status(500).json({ message: 'שגיאה במחיקת מוצר' });
  }
};
