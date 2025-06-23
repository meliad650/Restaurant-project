const db = require('../db');

exports.findAll = async () => {
  const [rows] = await db.execute('SELECT * FROM branches');
  return rows;
};

exports.create = async ({ id, city, street, building_number, phone }) => {
  await db.execute(
    `INSERT INTO branches (id, city, street, building_number, phone)
     VALUES (?, ?, ?, ?, ?)`,
    [id, city, street, building_number, phone]
  );
};

exports.remove = async (id) => {
  await db.execute('DELETE FROM branches WHERE id = ?', [id]);
};
