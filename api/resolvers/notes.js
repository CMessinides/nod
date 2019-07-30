const Notes = require("../stores/Notes");
const Notebooks = require("../stores/Notebooks");
const sluggable = require("./sluggable");
const nullIfNotFound = require("./nullIfNotFound");

module.exports = {
  noteById(parent, args) {
    return Notes.getById(args.id);
  },
  Note: sluggable({
    notebook({ notebookId }) {
      return nullIfNotFound(Notebooks.getById(notebookId));
    }
  })
};
