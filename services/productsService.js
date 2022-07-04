const productsModel = require('../models/productsModel');

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

module.exports = {
  getAll,
  getById,
  create,
};