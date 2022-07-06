const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');
const Sales = require('../schemas/SalesValidations');

const create = async (itemsSold) => {
  const isInvalid = await Sales.itemsValidation(itemsSold);
  if (isInvalid) return isInvalid;
  
  const { id } = await salesModel.create();
  const result = { code: 201, sale: { id, itemsSold } };

  await Promise.all(itemsSold.map(({ productId, quantity }) => 
    salesProductsModel.create(id, productId, quantity)));

  return result;
};

module.exports = {
  create,
};