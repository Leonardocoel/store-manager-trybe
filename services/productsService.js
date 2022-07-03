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
  const data = await productsModel.create(name);

  return data;
};

module.exports = {
  getAll,
  getById,
  create,
};