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

const getAll = async () => {
  const data = await salesModel.getAll();
  
  if (!data) return { code: 404, message: 'Sale not found' };
  const result = { code: 200, sale: data };

  return result;
};

const getById = async (id) => {
  if (!id) return false;

  const data = await salesModel.getById(id);

  if (!data || data.length < 1) return { code: 404, message: 'Sale not found' };
  const result = { code: 200, sale: data };

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};