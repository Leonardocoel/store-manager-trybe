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

module.exports = {
  getAll,
};