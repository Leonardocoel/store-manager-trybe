const productsService = require('../services/productsService');
const HTTP_STATUS = require('../helpers/httpStatusCode');

const getAll = async (_req, res, next) => {
  try {
    const results = await productsService.getAll();
    if (!results) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'There are no products' });
    }
    res.status(HTTP_STATUS.OK).json(results);
  } catch (err) {
   next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.getById(id);
    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Product not found' });
    }
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};