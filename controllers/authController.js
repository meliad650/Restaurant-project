
const db = require('../db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  insertUser,
  insertPassword,
  getUserByEmail,
  getPasswordByUserId
} = require('../models/authModels');

const WAITER_SECRET = "WAIT1223";
const MANAGER_SECRET = "MAN1212";

exports.register = async (req, res) => {
  const { teudat_zehut, email, first_name, address, password, secret } = req.body;
console.log("SECRET:", secret);

  if (!teudat_zehut || !email || !first_name || !address || !password) {
    return res.status(400).json({ message: "נא למלא את כל השדות החובה" });
  }

  let role = "customer";
if (secret && secret.trim() !== '') {
  if (secret === WAITER_SECRET) role = "waiter";
  else if (secret === MANAGER_SECRET) role = "manager";
  else return res.status(400).json({ message: 'סיסמת ניהול שגויה' });
}

console.log('ROLE BEING SAVED:', role);
const [existing] = await db.execute(
  'SELECT id FROM users WHERE teudat_zehut = ? OR email = ?',
  [teudat_zehut, email]
);
if (existing.length > 0) {
  return res.status(400).json({ message: 'משתמש עם המייל או תעודת הזהות כבר קיים' });
}
  try {   
    const userId = await insertUser(teudat_zehut, email, first_name, address, role,password);
    res.status(201).json({ message: "נרשמת בהצלחה", role });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "ההרשמה נכשלה!" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('📩 התחברות עם:', { email, password });

  try {
    // שליפת המשתמש לפי אימייל
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    console.log('🔍 משתמשים שנמצאו:', users);

    const user = users[0];
    if (!user) {
      console.warn('⚠️ משתמש לא נמצא:', email);
      return res.status(401).json({ message: 'משתמש לא נמצא' });
    }

    console.log('👤 משתמש:', {
      id: user.id,
      email: user.email,
      role: user.role,
      password: user.password, // רק לזיהוי, אל תשאירי בהפקה!
    });

    // בדיקת סיסמה
    const passwordMatch = password === user.password;
    console.log('🧪 בדיקת סיסמה:', passwordMatch);

    if (!passwordMatch) {
      console.warn('❌ סיסמה לא תואמת עבור המשתמש:', user.id);
      return res.status(401).json({ message: 'סיסמה שגויה' });
    }

    // יצירת טוקן
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    console.log('🔑 טוקן שנוצר:', token);

    res.json({ token, email: user.email, role: user.role });
    console.log('✅ התחברות הצליחה עבור:', user.email);
  } catch (err) {
    console.error('❌ שגיאה בשרת בעת התחברות:', err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
