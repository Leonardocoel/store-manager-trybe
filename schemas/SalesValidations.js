const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('./SalesSchemas');
const productsService = require('../services/productsService');

const itemsValidation = async (itemsSold) => {
  const error = await Promise.all(itemsSold.map(async ({ productId, quantity }) => {
    const { error: BAD } = BAD_REQUEST.validate({ productId, quantity });
    const { error: UNPROCESSABLE } = UNPROCESSABLE_ENTITY.validate({ quantity });
    const FOUND = await productsService.getById(productId);

    if (BAD) {
      return { code: 400, message: BAD.message };
    }

    if (!FOUND) {
      return { code: 404, message: 'Product not found' };
    }

    if (UNPROCESSABLE) {
      return { code: 422, message: UNPROCESSABLE.message };
    }
   }));
   
  return error.find((err) => err !== undefined);
};

module.exports = {
  itemsValidation,
}; 