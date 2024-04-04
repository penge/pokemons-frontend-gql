import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Attack = {
  __typename?: 'Attack';
  damage: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Mutation = {
  __typename?: 'Mutation';
  favoritePokemon?: Maybe<Pokemon>;
  unFavoritePokemon?: Maybe<Pokemon>;
};


export type MutationFavoritePokemonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnFavoritePokemonArgs = {
  id: Scalars['ID']['input'];
};

export type Pokemon = {
  __typename?: 'Pokemon';
  attacks: PokemonAttack;
  classification: Scalars['String']['output'];
  evolutionRequirements?: Maybe<PokemonEvolutionRequirement>;
  evolutions: Array<Pokemon>;
  fleeRate: Scalars['Float']['output'];
  height: PokemonDimension;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isFavorite: Scalars['Boolean']['output'];
  maxCP: Scalars['Int']['output'];
  maxHP: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  resistant: Array<Scalars['String']['output']>;
  sound: Scalars['String']['output'];
  types: Array<Scalars['String']['output']>;
  weaknesses: Array<Scalars['String']['output']>;
  weight: PokemonDimension;
};

export type PokemonAttack = {
  __typename?: 'PokemonAttack';
  fast: Array<Attack>;
  special: Array<Attack>;
};

export type PokemonConnection = {
  __typename?: 'PokemonConnection';
  count: Scalars['Int']['output'];
  edges: Array<Pokemon>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type PokemonDimension = {
  __typename?: 'PokemonDimension';
  maximum: Scalars['String']['output'];
  minimum: Scalars['String']['output'];
};

export type PokemonEvolutionRequirement = {
  __typename?: 'PokemonEvolutionRequirement';
  amount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PokemonFilterInput = {
  isFavorite?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PokemonsQueryInput = {
  filter?: InputMaybe<PokemonFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  pokemonById?: Maybe<Pokemon>;
  pokemonByName?: Maybe<Pokemon>;
  pokemonTypes: Array<Scalars['String']['output']>;
  pokemons: PokemonConnection;
};


export type QueryPokemonByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryPokemonsArgs = {
  query: PokemonsQueryInput;
};

export type Root = {
  __typename?: 'Root';
  query: Query;
};

export type FavoritePokemonMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FavoritePokemonMutation = { __typename?: 'Mutation', favoritePokemon?: { __typename?: 'Pokemon', id: string, name: string, isFavorite: boolean } | null };

export type UnFavoritePokemonMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UnFavoritePokemonMutation = { __typename?: 'Mutation', unFavoritePokemon?: { __typename?: 'Pokemon', id: string, name: string, isFavorite: boolean } | null };

export type PokemonByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type PokemonByNameQuery = { __typename?: 'Query', pokemonByName?: { __typename?: 'Pokemon', id: string, name: string, image: string, sound: string, types: Array<string>, isFavorite: boolean, maxCP: number, maxHP: number, weight: { __typename?: 'PokemonDimension', minimum: string, maximum: string }, height: { __typename?: 'PokemonDimension', minimum: string, maximum: string }, evolutions: Array<{ __typename?: 'Pokemon', id: string, name: string, image: string, isFavorite: boolean }> } | null };

export type PokemonTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type PokemonTypesQuery = { __typename?: 'Query', pokemonTypes: Array<string> };

export type PokemonsQueryVariables = Exact<{
  query: PokemonsQueryInput;
}>;


export type PokemonsQuery = { __typename?: 'Query', pokemons: { __typename?: 'PokemonConnection', limit: number, offset: number, count: number, edges: Array<{ __typename?: 'Pokemon', id: string, name: string, image: string, types: Array<string>, isFavorite: boolean }> } };


export const FavoritePokemonDocument = gql`
    mutation FavoritePokemon($id: ID!) {
  favoritePokemon(id: $id) {
    id
    name
    isFavorite
  }
}
    `;
export type FavoritePokemonMutationFn = Apollo.MutationFunction<FavoritePokemonMutation, FavoritePokemonMutationVariables>;

/**
 * __useFavoritePokemonMutation__
 *
 * To run a mutation, you first call `useFavoritePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoritePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoritePokemonMutation, { data, loading, error }] = useFavoritePokemonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFavoritePokemonMutation(baseOptions?: Apollo.MutationHookOptions<FavoritePokemonMutation, FavoritePokemonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoritePokemonMutation, FavoritePokemonMutationVariables>(FavoritePokemonDocument, options);
      }
export type FavoritePokemonMutationHookResult = ReturnType<typeof useFavoritePokemonMutation>;
export type FavoritePokemonMutationResult = Apollo.MutationResult<FavoritePokemonMutation>;
export type FavoritePokemonMutationOptions = Apollo.BaseMutationOptions<FavoritePokemonMutation, FavoritePokemonMutationVariables>;
export const UnFavoritePokemonDocument = gql`
    mutation UnFavoritePokemon($id: ID!) {
  unFavoritePokemon(id: $id) {
    id
    name
    isFavorite
  }
}
    `;
export type UnFavoritePokemonMutationFn = Apollo.MutationFunction<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>;

/**
 * __useUnFavoritePokemonMutation__
 *
 * To run a mutation, you first call `useUnFavoritePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFavoritePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFavoritePokemonMutation, { data, loading, error }] = useUnFavoritePokemonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnFavoritePokemonMutation(baseOptions?: Apollo.MutationHookOptions<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>(UnFavoritePokemonDocument, options);
      }
export type UnFavoritePokemonMutationHookResult = ReturnType<typeof useUnFavoritePokemonMutation>;
export type UnFavoritePokemonMutationResult = Apollo.MutationResult<UnFavoritePokemonMutation>;
export type UnFavoritePokemonMutationOptions = Apollo.BaseMutationOptions<UnFavoritePokemonMutation, UnFavoritePokemonMutationVariables>;
export const PokemonByNameDocument = gql`
    query PokemonByName($name: String!) {
  pokemonByName(name: $name) {
    id
    name
    image
    sound
    types
    isFavorite
    maxCP
    maxHP
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    evolutions {
      id
      name
      image
      isFavorite
    }
  }
}
    `;

/**
 * __usePokemonByNameQuery__
 *
 * To run a query within a React component, call `usePokemonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function usePokemonByNameQuery(baseOptions: Apollo.QueryHookOptions<PokemonByNameQuery, PokemonByNameQueryVariables> & ({ variables: PokemonByNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(PokemonByNameDocument, options);
      }
export function usePokemonByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonByNameQuery, PokemonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(PokemonByNameDocument, options);
        }
export function usePokemonByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PokemonByNameQuery, PokemonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PokemonByNameQuery, PokemonByNameQueryVariables>(PokemonByNameDocument, options);
        }
export type PokemonByNameQueryHookResult = ReturnType<typeof usePokemonByNameQuery>;
export type PokemonByNameLazyQueryHookResult = ReturnType<typeof usePokemonByNameLazyQuery>;
export type PokemonByNameSuspenseQueryHookResult = ReturnType<typeof usePokemonByNameSuspenseQuery>;
export type PokemonByNameQueryResult = Apollo.QueryResult<PokemonByNameQuery, PokemonByNameQueryVariables>;
export const PokemonTypesDocument = gql`
    query PokemonTypes {
  pokemonTypes
}
    `;

/**
 * __usePokemonTypesQuery__
 *
 * To run a query within a React component, call `usePokemonTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePokemonTypesQuery(baseOptions?: Apollo.QueryHookOptions<PokemonTypesQuery, PokemonTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonTypesQuery, PokemonTypesQueryVariables>(PokemonTypesDocument, options);
      }
export function usePokemonTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonTypesQuery, PokemonTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonTypesQuery, PokemonTypesQueryVariables>(PokemonTypesDocument, options);
        }
export function usePokemonTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PokemonTypesQuery, PokemonTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PokemonTypesQuery, PokemonTypesQueryVariables>(PokemonTypesDocument, options);
        }
export type PokemonTypesQueryHookResult = ReturnType<typeof usePokemonTypesQuery>;
export type PokemonTypesLazyQueryHookResult = ReturnType<typeof usePokemonTypesLazyQuery>;
export type PokemonTypesSuspenseQueryHookResult = ReturnType<typeof usePokemonTypesSuspenseQuery>;
export type PokemonTypesQueryResult = Apollo.QueryResult<PokemonTypesQuery, PokemonTypesQueryVariables>;
export const PokemonsDocument = gql`
    query Pokemons($query: PokemonsQueryInput!) {
  pokemons(query: $query) {
    limit
    offset
    count
    edges {
      id
      name
      image
      types
      isFavorite
    }
  }
}
    `;

/**
 * __usePokemonsQuery__
 *
 * To run a query within a React component, call `usePokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function usePokemonsQuery(baseOptions: Apollo.QueryHookOptions<PokemonsQuery, PokemonsQueryVariables> & ({ variables: PokemonsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
      }
export function usePokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonsQuery, PokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
        }
export function usePokemonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PokemonsQuery, PokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
        }
export type PokemonsQueryHookResult = ReturnType<typeof usePokemonsQuery>;
export type PokemonsLazyQueryHookResult = ReturnType<typeof usePokemonsLazyQuery>;
export type PokemonsSuspenseQueryHookResult = ReturnType<typeof usePokemonsSuspenseQuery>;
export type PokemonsQueryResult = Apollo.QueryResult<PokemonsQuery, PokemonsQueryVariables>;