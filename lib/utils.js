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

/**
 * Decorate an object with a sequence of decorator functions
 * @param {!O} obj - the object to be decorated
 * @param {...(obj: O) => O} decorators - the decorators to apply
 * @returns {O}
 * @template O
 */
function decorate(obj, ...decorators) {
  obj = decorators.reduce((obj, decorator) => {
    if (typeof decorator !== "function") {
      throw new Error("Decorator must be a function, was " + typeof decorator);
    }
    obj = decorator(obj);
    return obj;
  }, obj);
  return obj;
}

module.exports = {
  pick,
  decorate
};
