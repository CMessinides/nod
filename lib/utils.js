/**
 * Pick a key or set of keys from an object
 * @param {Object.<string, any>} obj
 * @param {string|string[]} keys
 * @returns {Object.<string, any>}
 */
function pick(obj = {}, keys = []) {
  if (obj === null || obj === undefined) {
    throw new Error("Cannot pick keys from " + obj);
  }

  // allow caller to send just one key as a raw string
  if (typeof keys === "string") {
    return { [keys]: obj[keys] };
  }

  if (Array.isArray(keys)) {
    return keys.reduce((newObj, key) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});
  }

  throw new Error("Keys must be a string or array of strings");
}

module.exports = {
  pick
};
