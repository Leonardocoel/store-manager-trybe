const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

const create = async (itemsSold) => {
  const { id } = await salesModel.create();

  await Promise.all(itemsSold.map(({ productId, quantity }) =>
    salesProductsModel.create(id, productId, quantity)));
  
  const result = {
    status: 201,
    sale: { id, itemsSold },
  };

  return result;
};

module.exports = {
  create,
};