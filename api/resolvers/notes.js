const Notes = require("../stores/Notes");
const Notebooks = require("../stores/Notebooks");
const sluggable = require("./sluggable");
const nullIfNotFound = require("./nullIfNotFound");
const { decorate } = require("../../lib/utils");

const Note = {
  notebook({ notebookId }) {
    return nullIfNotFound(Notebooks.getById(notebookId));
  }
};

module.exports = {
  noteById(parent, args) {
    return Notes.getById(args.id);
  },
  Note: decorate(Note, sluggable)
};
