const productsModel = require('../models/productsModel');

const getAll = async () => {
  const data = await productsModel.getAll();
  
  if (!data) return [];
  return data;
};

const getById = async (id) => {
  if (!id || typeof id !== 'number') return false;

  const data = await productsModel.getById(id);
  if (!data) return [];
  return data;
};

module.exports = {
  getAll,
  getById,
};