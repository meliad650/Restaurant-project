const Branch = require('../models/branchesModel');

exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשליפת סניפים' });
  }
};

exports.addBranch = async (req, res) => {
  const { city, street, building_number, phone } = req.body;
  try {
    await Branch.create({ city, street, building_number, phone });
    res.status(201).json({ message: 'סניף נוסף בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'שגיאה בהוספת סניף' });
  }
};

exports.deleteBranch = async (req, res) => {
  const id = req.params.id;
  try {
    await Branch.remove(id);
    res.json({ message: 'הסניף נמחק' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקה' });
  }
};
