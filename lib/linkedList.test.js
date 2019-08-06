import LinkedList from "./LinkedList";

it("should order a linked list", () => {
	const unsortedList = [
		{
			id: 5,
			prevId: 7
		},
		{
			id: 7,
			prevId: null
		},
		{
			id: 3,
			prevId: 4
		},
		{
			id: 6,
			prevId: 5
		},
		{
			id: 4,
			prevId: 6
		}
	];

	expect(
		Array.from(LinkedList(unsortedList, "id", "prevId"))
	).toMatchSnapshot();
});
