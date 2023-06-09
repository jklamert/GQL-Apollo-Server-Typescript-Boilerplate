import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { MyContext } from "./context";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { DataSource } from "./dataSource.js";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { resolvers } from "./resolvers.js";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const server = new ApolloServer<MyContext>({
  typeDefs: typeDefs,
  resolvers: resolvers,
  formatError: (formattedError, error) => {
    if (
      formattedError.extensions.code ===
      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    ) {
      return {
        ...formattedError,
        message: "Your query doesn't match the schema. Try double-checking it!",
      };
    }

    return formattedError;
  },
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
  ],
});

const { url } = await startStandaloneServer(server, {
  context: async function ({ req }) {
    return {
      listen: { port: 4000 },
      token: req.headers.authorization || "",
      dataSources: {
        api: new DataSource(),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
