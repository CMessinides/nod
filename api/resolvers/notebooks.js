const Notebooks = require("../stores/Notebooks");
const Notes = require("../stores/Notes");
const { NotFoundError } = require("../errors");
const sluggable = require("./sluggable");

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
  Notebook: sluggable({
    notes({ id }) {
      return Notes.getByNotebookId(id);
    }
  })
};
