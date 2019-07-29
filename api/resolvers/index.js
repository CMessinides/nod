const { Date } = require("./date");
const notebooks = require("./notebooks");
const notes = require("./notes");

module.exports = {
  Query: {
    ...notebooks.Query,
    ...notes.Query
  },
  Date,
  Notebook: notebooks.Notebook,
  Note: notes.Note
};
