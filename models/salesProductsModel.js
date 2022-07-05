const connection = require('../helpers/connection');

const create = async (saleId, productId, quantity) => {
   await connection.execute(
    `INSERT INTO StoreManager.products (sale_id,product_id,quantity)
    VALUES (?,?,?)`,
    [saleId, productId, quantity],
  );
};

module.exports = {
  create,
};