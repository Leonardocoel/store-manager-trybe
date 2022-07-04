const productsService = require('../services/productsService');
const { HTTP_STATUS, ERR_MSG } = require('../helpers/httpStatusCode');

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

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const RESULT = await productsService.create(name);

    if (RESULT === 'BAD_REQUEST') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(ERR_MSG.NAME_REQUIRED); 
}
    if (RESULT === 'UNPROCESSABLE_ENTITY') {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(ERR_MSG.NAME_INVALID);
    } 

       res.status(HTTP_STATUS.CREATED).json(RESULT);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};