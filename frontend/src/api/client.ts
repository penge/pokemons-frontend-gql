import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PokemonConnection, PokemonsQueryInput } from "@/api/generated/graphql";
import { uniqBy } from "lodash-es";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: ["query", ["search", "filter"]],

            read(existing: PokemonConnection | undefined, { args, readField }) {
              if (!existing) {
                return existing;
              }

              const query = (args as { query: PokemonsQueryInput }).query;
              if (!query.filter?.isFavorite) {
                return { ...existing };
              }

              const filteredEdges = existing.edges.filter((pokemon) => {
                const isFavorite = readField<boolean>("isFavorite", pokemon);
                return isFavorite;
              });

              const uniqueEdges = uniqBy(filteredEdges, "__ref");

              return {
                ...existing,
                edges: uniqueEdges,
                count: uniqueEdges.length,
              };
            },

            merge(existing: PokemonConnection | undefined, incoming: PokemonConnection): PokemonConnection {
              return {
                ...incoming,
                edges: [
                  ...(existing?.edges ?? []),
                  ...incoming.edges,
                ],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
