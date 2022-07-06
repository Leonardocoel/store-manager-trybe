const Joi = require('joi');

const BAD_REQUEST = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const UNPROCESSABLE_ENTITY = Joi.object({
  quantity: Joi.number().min(1),
});

module.exports = {
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
};
