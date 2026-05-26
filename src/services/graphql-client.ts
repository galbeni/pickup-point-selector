import { GraphQLClient } from "graphql-request";
import { ENV } from "@/constants/env";

export const graphqlClient = new GraphQLClient(
  ENV.GRAPHQL_ENDPOINT,
);