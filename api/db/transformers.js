module.exports = {
  snakeToCamel(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
      acc[newKey] = obj[key];
      return acc;
    }, {});
  },
  camelToSnake(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key
        .replace(
          /([a-z])([A-Z])/g,
          (match, p1, p2) => p1 + "_" + p2.toLowerCase()
        )
        .toLowerCase();
      acc[newKey] = obj[key];
      return acc;
    }, {});
  }
};
