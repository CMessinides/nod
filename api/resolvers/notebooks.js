const Notebooks = require("../stores/Notebooks");
const Notes = require("../stores/Notes");
const sluggable = require("./sluggable");

module.exports = {
  Query: {
    notebooks() {
      return Notebooks.all();
    },
    notebookById(parent, args) {
      return Notebooks.getById(args.id);
    }
  },
  Notebook: sluggable({
    notes({ id }) {
      return Notes.getByNotebookId(id);
    }
  })
};
