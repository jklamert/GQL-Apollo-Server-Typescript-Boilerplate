import { DataSource } from "../src/dataSource";
import { MyContext } from "../src/context";
import { resolvers } from "../src/resolvers";
import { readFileSync } from "fs";
import { describe, expect, it } from "@jest/globals";
import { ApolloServer } from "@apollo/server";

import { ApolloServerErrorCode } from "@apollo/server/errors";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

describe("Apollo Server", () => {
  const typeDefs = readFileSync("schema.graphql", {
    encoding: "utf-8",
  });

  const context = {
    token: "",
    dataSources: {
      api: new DataSource(),
    },
  };

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: (formattedError, error) => {
      if (
        formattedError.extensions.code ===
        ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
      ) {
        return {
          ...formattedError,
          message:
            "Your query doesn't match the schema. Try double-checking it!",
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

  it("fetches the number 6", async () => {
    // run the query against the server and snapshot the output
    const GET_SIX = `query numberSix {
      numberSix
    }`;
    const response = await server.executeOperation(
      {
        query: GET_SIX,
        variables: null,
      },
      {
        contextValue: context,
      }
    );

    expect(response.body.kind).toBe("single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.numberSix).toBe(6);
  });
});
