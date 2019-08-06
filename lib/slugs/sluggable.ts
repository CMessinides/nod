import slugify from "slugify";
import { Sluggable } from "./interfaces";

export default function sluggable(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	SluggableClass: new (...args: any[]) => Sluggable
) {
	return class extends SluggableClass implements Sluggable {
		public get slug() {
			return slugify(this.title, { lower: true }) + "--" + this.id;
		}
	};
}
