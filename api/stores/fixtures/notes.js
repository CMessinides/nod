/**
 * @typedef Note
 * @prop {number} id
 * @prop {string} title
 * @prop {Date} createdAt
 * @prop {Date} modifiedAt
 * @prop {number} notebookId
 */

let idCounter = 0;

function randomDate(spread = 36000) {
	return new Date(Date.now() - Math.random() * spread);
}

/**
 * @returns {Note}
 */
function createMockNote() {
	return {
		id: idCounter++,
		title: "Note Title",
		createdAt: randomDate(),
		modifiedAt: randomDate(),
		notebookId: Math.round(Math.random() * 10)
	};
}

/** @type {Note[]} */
const notes = [];
for (let i = 0; i < 20; i++) {
	notes.push(createMockNote());
}

module.exports = notes;
