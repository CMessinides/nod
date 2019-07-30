import slugify from "slugify";

export default function sluggable(type) {
  type.slug = function slug(parent) {
    return slugify(parent.title, { lower: true });
  };

  return type;
}
