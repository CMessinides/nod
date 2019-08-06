/**
 * @typedef Notebook
 * @prop {number} id
 * @prop {string} title
 * @prop {string} description
 * @prop {Date} createdAt
 */

let idCounter = 0;

function randomDate(spread = 36000) {
	return new Date(Date.now() - Math.random() * spread);
}

/**
 * @returns {Notebook}
 */
function createMockNotebook() {
	return {
		id: idCounter++,
		title: "Notebook Title",
		description: "This is a notebook description.",
		createdAt: randomDate()
	};
}

/** @type {Notebook[]} */
const notebooks = [];
for (let i = 0; i < 20; i++) {
	notebooks.push(createMockNotebook());
}

module.exports = notebooks;
