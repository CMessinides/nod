const Notes = require("../stores/Notes");
const Notebooks = require("../stores/Notebooks");
const { NotFoundError } = require("../errors");
const sluggable = require("./sluggable");

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
  Note: sluggable({
    notebook({ notebookId }) {
      return Notebooks.getById(notebookId);
    }
  })
};
