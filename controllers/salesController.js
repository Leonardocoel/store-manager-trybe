const salesService = require('../services/salesService');

const create = async (req, res, next) => {
  try {
    const itemsSold = req.body;
    const { code, sale, message } = await salesService.create(itemsSold);

    if (!sale) return res.status(code).json({ message });
    
    res.status(code).json(sale);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const { code, sale, message } = await salesService.getAll();
    
     if (!sale) return res.status(code).json({ message });
    
    res.status(code).json(sale);
  } catch (err) {
   next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, sale, message } = await salesService.getById(id);
     if (!sale) return res.status(code).json({ message });
    
    res.status(code).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};