const DB = jest.genMockFromModule("../DB").default;

export function mockRows(rows = [], { once = true } = {}): void {
	const result = { rows, rowCount: rows.length };
	if (once) {
		DB.query.mockResolvedValueOnce(result);
	} else {
		DB.query.mockResolvedValue(result);
	}
}

DB.__mockRows = mockRows;
DB.__mockRows([], { once: false });

export default DB;
