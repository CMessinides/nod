module.exports = {
  Query: {
    notebooks(parent, args, context) {
      return context.Notebooks.all();
    },
    notebookById(parent, args, context) {
      return context.Notebooks.getById(args.id);
    }
  },
  Notebook: {}
};
