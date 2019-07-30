const Notebooks = require("../stores/Notebooks");
const Notes = require("../stores/Notes");
const sluggable = require("./sluggable");
const { decorate } = require("../../lib/utils");

const Notebook = {
  notes({ id }) {
    return Notes.getByNotebookId(id);
  }
};

module.exports = {
  notebooks() {
    return Notebooks.all();
  },
  notebookById(parent, args) {
    return Notebooks.getById(args.id);
  },
  Notebook: decorate(Notebook, sluggable)
};
