const { Date } = require("./date");
const notebooks = require("./notebooks");

module.exports = {
  Query: {
    ...notebooks.Query
  },
  Date,
  Notebook: notebooks.Notebook
};
