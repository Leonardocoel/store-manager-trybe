const Joi = require('joi');

const BAD_REQUEST = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

const UNPROCESSABLE_ENTITY = Joi.object({
  name: Joi.string().min(5),
});

module.exports = {
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
};
