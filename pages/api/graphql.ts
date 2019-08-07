import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../lib/graphql/schema";
import resolvers from "../../lib/graphql/resolvers";
import { dev } from "../../config/server.config";

const apolloServer = new ApolloServer({ typeDefs, resolvers, debug: dev });

// oo
export const config = {
	api: {
		bodyParser: false
	}
};

export default apolloServer.createHandler({ path: "/api/graphql" });
