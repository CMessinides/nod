const { ApolloError } = require("apollo-server-micro");
const { ErrorType, ErrorStatusCodes } = require("../lib/errors");

class UserInputError extends ApolloError {
	constructor(message, properties) {
		super(message, ErrorType.USER_INPUT, {
			...properties,
			status: ErrorStatusCodes.USER_INPUT
		});

		Object.defineProperty(this, "name", { value: "UserInputError" });
	}
}

class AuthenticationError extends ApolloError {
	constructor(message, properties) {
		super(message, ErrorType.AUTHENTICATION, {
			...properties,
			status: ErrorStatusCodes.AUTHENTICATION
		});

		Object.defineProperty(this, "name", { value: "NotAuthorizedError" });
	}
}

class NotFoundError extends ApolloError {
	constructor(message) {
		super(message, ErrorType.NOT_FOUND, { status: ErrorStatusCodes.NOT_FOUND });

		Object.defineProperty(this, "name", { value: "NotFoundError" });
	}
}

class ServerError extends ApolloError {
	constructor(message, properties) {
		super(message, ErrorType.SERVER, {
			...properties,
			status: ErrorStatusCodes.SERVER
		});

		Object.defineProperty(this, "name", { value: "ServerError" });
	}
}

module.exports = {
	NotFoundError,
	ServerError,
	AuthenticationError,
	UserInputError
};
