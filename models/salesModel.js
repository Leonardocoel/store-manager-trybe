const connection = require('../helpers/connection');

const create = async () => {
  const [row] = await connection.execute(
    `INSERT INTO StoreManager.sales ()
    VALUES ()`,
  );
  
  return { id: row.insertId };
};

const getAll = async () => {
  const [rows] = await connection.execute(
    `SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp 
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id`,
  ); 

  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp 
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id, sp.product_id`,
    [id],
  );

  return rows;
};

module.exports = {
  create,
  getAll,
  getById,
};