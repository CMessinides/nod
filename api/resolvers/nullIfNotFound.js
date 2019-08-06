import { ErrorType } from "../../lib/errors";

export default async function nullIfNotFound(promise) {
	try {
		return await promise;
	} catch (e) {
		switch (e.extensions.code) {
			case ErrorType.NOT_FOUND:
				return null;
			default:
				throw e;
		}
	}
}
