const db = require('../db');

exports.findAll = async () => {
  const [rows] = await db.execute(    "SELECT * FROM branches WHERE status = 'פעיל'"
);
  return rows;
};

exports.create = async ({  city, street, building_number, phone }) => {
  ('City:', city, 'Street:', street, 'Number:', building_number, 'Phone:', phone);
  await db.execute(
    `INSERT INTO branches ( city, street, building_number, phone)
     VALUES ( ?, ?, ?, ?)`,
    [ city, street, building_number, phone]
  );
};

exports.remove = async (id) => {
  const [result] = await db.query(
    "UPDATE branches SET status = 'לא קיים' WHERE id = ?",
    [id]
  );
  return result;
};
