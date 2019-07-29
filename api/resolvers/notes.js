const Notes = require("../stores/Notes");
const Notebooks = require("../stores/Notebooks");
const { NotFoundError } = require("../errors");

module.exports = {
  Query: {
    async noteById(parent, args) {
      const note = await Notes.getById(args.id);

      if (note === null) {
        throw new NotFoundError("No note found with ID " + args.id);
      }

      return note;
    }
  },
  Note: {
    slug(parent) {
      return require("slugify")(parent.title, { lower: true });
    },
    notebook({ notebookId }) {
      return Notebooks.getById(notebookId);
    }
  }
};
