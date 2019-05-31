const Notebooks = require("../stores/Notebooks");

module.exports = {
  Query: {
    notebooks() {
      return Notebooks.all();
    },
    notebookById(parent, args) {
      return Notebooks.getById(args.id);
    }
  },
  Notebook: {}
};
