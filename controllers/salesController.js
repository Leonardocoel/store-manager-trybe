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

module.exports = {
  create,
};