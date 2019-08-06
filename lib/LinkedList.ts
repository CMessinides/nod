export default function* LinkedList<
	L extends Record<string | symbol | number, any>,
	I extends keyof L,
	P extends keyof L
>(list: L[], idKey: I, prevIdKey: P) {
	if (list.length === 0) return;

	let currentId = null;

	// Selectors to make ID access more readable
	const getId = (item: L) => item[idKey];
	const getPrevId = (item: L) => item[prevIdKey];

	// Create a hash table mapping
	// each item's previous ID to its index in
	// the unsorted list.
	const map = list.reduce(
		(map, item, index) => {
			map[getPrevId(item)] = index;
			return map;
		},
		{} as Record<string | symbol | number, number>
	);

	for (let i = 0; i < list.length; i++) {
		const nextItem = list[map[currentId]];
		yield nextItem;
		currentId = getId(nextItem);
	}
}
