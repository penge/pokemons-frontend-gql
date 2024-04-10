import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PokemonConnection } from "@/api/generated/graphql";
import { sortBy, uniqBy } from "lodash-es";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: ["query", ["search", "filter"]],
            merge(existing: PokemonConnection | undefined, incoming: PokemonConnection): PokemonConnection {
              return {
                ...incoming,
                edges: sortBy(uniqBy([
                  ...(existing?.edges ?? []),
                  ...incoming.edges,
                ], "__ref"), "__ref"),
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
