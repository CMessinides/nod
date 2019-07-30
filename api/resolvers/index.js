const { Date } = require("./date");
const { notebooks, notebookById, Notebook } = require("./notebooks");
const { noteById, Note } = require("./notes");

module.exports = {
  Query: {
    notebooks,
    notebookById,
    noteById
  },
  Date,
  Notebook,
  Note
};
