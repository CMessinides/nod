import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export default new GraphQLScalarType({
	name: "Date",
	description:
		"A date represented as the number of milliseconds since the Unix epoch",
	parseValue(value: number): Date {
		return new Date(value);
	},
	serialize(value: Date): number {
		return value.getTime();
	},
	parseLiteral(ast): Date {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value);
		}
		return null;
	}
});
