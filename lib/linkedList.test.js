import { sortLinkedList } from "./linkedList";

describe("sortLinkedList", () => {
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

    expect(sortLinkedList(unsortedList)).toStrictEqual([
      {
        id: 7,
        prevId: null
      },
      {
        id: 5,
        prevId: 7
      },
      {
        id: 6,
        prevId: 5
      },
      {
        id: 4,
        prevId: 6
      },
      {
        id: 3,
        prevId: 4
      }
    ]);
  });

  it("should return an empty list unchanged", () => {
    const emptyList = [];

    expect(sortLinkedList(emptyList)).toBe(emptyList);
  });

  it("should allow custom reference keys", () => {
    const unsortedList = [
      {
        customId: 2,
        customPrevId: 4
      },
      {
        customId: 3,
        customPrevId: 1
      },
      {
        customId: 1,
        customPrevId: null
      },
      {
        customId: 4,
        customPrevId: 3
      }
    ];

    expect(
      sortLinkedList(unsortedList, {
        idKey: "customId",
        prevIdKey: "customPrevId"
      })
    ).toStrictEqual([
      {
        customId: 1,
        customPrevId: null
      },
      {
        customId: 3,
        customPrevId: 1
      },
      {
        customId: 4,
        customPrevId: 3
      },
      {
        customId: 2,
        customPrevId: 4
      }
    ]);
  });
});
