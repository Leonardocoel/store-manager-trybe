const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('./ProductSchemas');

const update = (id, name) => {
    const { error: BAD } = BAD_REQUEST.validate({ id, name });
    const { error: UNPROCESSABLE } = UNPROCESSABLE_ENTITY.validate({ name });

    if (BAD) {
      return { code: 400, message: BAD.message };
    }

    if (UNPROCESSABLE) {
      return { code: 422, message: UNPROCESSABLE.message };
    }
};

module.exports = {
  update,
}; 