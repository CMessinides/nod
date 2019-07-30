const { ErrorType } = require("../../lib/errors");

module.exports = async function nullIfNotFound(promise) {
  try {
    return await promise;
  } catch (e) {
    switch (e.extensions.code) {
      case ErrorType.NOT_FOUND:
        return null;
      default:
        throw e;
    }
  }
};
