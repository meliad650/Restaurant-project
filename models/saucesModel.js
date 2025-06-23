const db = require('../db');

exports.getAll = async () => {
  const [sauces] = await db.execute('SELECT * FROM sauces');
  return sauces;
};

exports.insert = async (name) => {
  const [result] = await db.execute(
    'INSERT INTO sauces (name) VALUES (?)',
    [name]
  );
  return result;
};

exports.update = async (id, name) => {
  await db.execute('UPDATE sauces SET name = ? WHERE id = ?', [name, id]);
};

exports.remove = async (id) => {
  await db.execute('DELETE FROM sauces WHERE id = ?', [id]);
};
