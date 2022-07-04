const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return rows;
};

const getById = async (id) => {
  const [[rows]] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );
  return rows;
};

const create = async (name) => {
  const [row] = await connection.execute(
    `INSERT INTO StoreManager.products (name)
    VALUES (?)`,
    [name],
  );
  const result = {
    id: row.insertId,
    name,
  };
  return result;
};

  module.exports = {
    getAll,
    getById,
    create,
};