import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../api/schema";
import resolvers from "../../api/resolvers";
import { dev } from "../../config/server.config";

const apolloServer = new ApolloServer({ typeDefs, resolvers, debug: dev });

export const config = {
	api: {
		bodyParser: false
	}
};

export default apolloServer.createHandler({ path: "/api/graphql" });
