const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const WAITER_SECRET = "MAN1223";

exports.register = async (req, res) => {
  const { teudat_zehut, email, first_name, address, password, waiter_secret } = req.body;

  if (!teudat_zehut || !email || !first_name || !address || !password) {
    return res.status(400).json({ message: "נא למלא את כל השדות החובה" });
  }

  const role = waiter_secret === WAITER_SECRET ? 'waiter' : 'customer';

  try {
    const [result] = await db.execute(
      `INSERT INTO users (teudat_zehut, email, first_name, address, role)
       VALUES (?, ?, ?, ?, ?)`,
      [teudat_zehut, email, first_name, address, role]
    );

    const userId = result.insertId;
    const hash = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO passwords (user_id, password_hash)
       VALUES (?, ?)`,
      [userId, hash]
    );

    res.status(201).json({ message: "נרשמת בהצלחה", role });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "הרשמה נכשלה. ייתכן שהאימייל או תעודת הזהות כבר רשומים." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user) return res.status(401).json({ message: 'משתמש לא נמצא' });

    const [passRows] = await db.execute('SELECT * FROM passwords WHERE user_id = ?', [user.id]);
    const passwordMatch = await bcrypt.compare(password, passRows[0]?.password_hash);
    if (!passwordMatch) return res.status(401).json({ message: 'סיסמה שגויה' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    console.error('שגיאה בהתחברות:', err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
