export function sortLinkedList(
  list,
  { idKey = "id", prevIdKey = "prevId" } = {}
) {
  if (list.length === 0) return list;

  const sortedList = [];
  let currentId = null;

  // First, create a hash table mapping
  // each item's previous ID to its index in
  // the unsorted list.
  const map = list.reduce((map, item, index) => {
    const prevId = item[prevIdKey];
    if (prevId === null) {
      // item is the first in the list
      sortedList.push(item);
      currentId = item[idKey];
    } else {
      map[prevId] = index;
    }

    return map;
  }, {});

  while (sortedList.length < list.length) {
    const nextItem = list[map[currentId]];
    sortedList.push(nextItem);
    currentId = nextItem[idKey];
  }

  return sortedList;
}
