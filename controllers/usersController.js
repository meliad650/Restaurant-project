const Users = require('../models/usersModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.json(users);
  } catch (err) {
    console.error('שגיאה בשליפת משתמשים:', err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await Users.getById(req.user.id);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    res.json(user[0]);
  } catch (err) {
    console.error('שגיאה בשליפת משתמש מה-token:', err);
    res.status(500).json({ message: 'שגיאת שרת' });
  }
};
