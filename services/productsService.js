const productsModel = require('../models/productsModel');
const productsValidation = require('../schemas/ProductsValidation');

const getAll = async () => {
  const data = await productsModel.getAll();
  
  if (!data) return null;
  return data;
};

const getById = async (id) => {
  if (!id) return false;

  const data = await productsModel.getById(id);
  if (!data) return null;
  return data;
};

const create = async (name) => {
  if (!name) return 'BAD_REQUEST';
  if (name.length < 5) return 'UNPROCESSABLE_ENTITY';
  
  const data = await productsModel.create(name);

  return data;
};

const update = async (id, name) => {
  const error = productsValidation.update(id, name);
  if (error) return error;

  const data = await productsModel.update(id, name);
  if (data !== 1) {
      return { code: 404, message: 'Product not found' };
  }

  return { code: 200, product: { id, name } };
};

const exclude = async (id) => {
  const data = await productsModel.exclude(id);
  if (data !== 1) {
      return { code: 404, message: 'Product not found' };
  }

  return { code: 204 };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};