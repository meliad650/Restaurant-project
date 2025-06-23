const Sauces = require('../models/saucesModel');

exports.getAllSauces = async (req, res) => {
  try {
    const sauces = await Sauces.getAll();
    res.json(sauces);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשליפת רטבים' });
  }
};

exports.addSauce = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await Sauces.insert(name);
    res.status(201).json({ message: 'רוטב נוסף בהצלחה', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בהוספת רוטב', error: err.message });
  }
};

exports.updateSauce = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Sauces.update(id, name);
    res.json({ message: 'הרוטב עודכן' });
  } catch (err) {
    res.status(400).json({ message: 'שגיאה בעדכון רוטב' });
  }
};

exports.deleteSauce = async (req, res) => {
  const { id } = req.params;
  try {
    await Sauces.remove(id);
    res.json({ message: 'הרוטב נמחק' });
  } catch (err) {
    res.status(400).json({ message: 'שגיאה במחיקת רוטב' });
  }
};
