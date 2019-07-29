module.exports = function sluggable(type) {
  type.slug = function slug(parent) {
    return require("slugify")(parent.title, { lower: true });
  };

  return type;
};
