const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER: 500,
};
 
const ERR_MSG = {
  NOT_FOUND: { message: 'Product not found' },
  NAME_REQUIRED: { message: '"name" is required' },
  NAME_INVALID: { message: '"name" length must be at least 5 characters long' },
};

module.exports = {
  HTTP_STATUS,
  ERR_MSG,
};