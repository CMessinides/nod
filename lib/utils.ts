export function pick<O extends {}, K extends keyof O>(
	obj: O,
	...keys: K[]
): Pick<O, K> {
	if (obj === null || obj === undefined) {
		throw new Error("Cannot pick keys from " + obj);
	}

	return keys.reduce(
		(newObj, key) => {
			newObj[key] = obj[key];
			return newObj;
		},
		{} as Pick<O, K>
	);
}
