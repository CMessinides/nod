import { ErrorType } from "../lib/errors";
import { ClientError, ApiError } from "../lib/types";

class BaseError extends Error implements ClientError {
	code: string;
	[x: string]: any;

	constructor(
		message: string,
		code: string,
		properties: Record<string, any> = {}
	) {
		super(message);
		this.code = code;

		if (properties) {
			Object.keys(properties).forEach(key => {
				this[key] = properties[key];
			});
		}

		if (!this.name) {
			Object.defineProperty(this, "name", { value: "BaseError" });
		}
	}
}

export class NetworkError extends BaseError {
	constructor(message: string) {
		super(message, ErrorType.NETWORK);

		Object.defineProperty(this, "name", { value: "NetworkError" });
	}
}

export class ResponseError extends BaseError {
	constructor(message: string, status: number) {
		super(message, ErrorType.RESPONSE, { status });

		Object.defineProperty(this, "name", { value: "ResponseError" });
	}
}

export class ParseError extends BaseError {
	constructor(message: string) {
		super(message, ErrorType.PARSE);
	}
}

export function marshalGraphQLError(error: ApiError): ClientError {
	const code = error.extensions.code || ErrorType.SERVER;
	return new BaseError(error.message, code, {
		...error.extensions,
		status: error.extensions.exception && error.extensions.exception.status
	});
}
