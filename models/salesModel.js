const connection = require('../helpers/connection');

const create = async () => {
  const [row] = await connection.execute(
    `INSERT INTO StoreManager.products ()
    VALUES ()`,
  );
  
  return { id: row.insertId };
};

module.exports = {
  create,
};