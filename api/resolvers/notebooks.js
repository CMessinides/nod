const Notebooks = require("../stores/Notebooks");
const Notes = require("../stores/Notes");
const { NotFoundError } = require("../errors");

module.exports = {
  Query: {
    notebooks() {
      return Notebooks.all();
    },
    async notebookById(parent, args) {
      const notebook = await Notebooks.getById(args.id);

      if (notebook === null) {
        throw new NotFoundError("No notebook found with ID " + args.id);
      }

      return notebook;
    }
  },
  Notebook: {
    slug(parent) {
      return require("slugify")(parent.title, { lower: true });
    },
    notes({ id }) {
      return Notes.getByNotebookId(id);
    }
  }
};
