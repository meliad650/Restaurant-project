const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // אין טוקן? אין גישה

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // טוקן שגוי
    req.user = user; // כאן נמצא ה־id וה־role וכל מה שהכנסת לטוקן
    next();
  });
}

module.exports = authenticateToken;
