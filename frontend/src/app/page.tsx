"use client";

import { useState, useMemo, useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { InlineLoading, Loading } from "@carbon/react";
import {
  usePokemonTypesQuery,
  usePokemonsQuery,
} from "@/api/generated/graphql";
import { isNull, isObject, merge } from "lodash-es";
import { Header } from "@/components/Header/Header";
import { View, isView } from "@/components/ChangeViewButtons/ChangeViewButtons";
import { PokemonCards } from "@/components/PokemonCards/PokemonCards";

const limit = 26;

export default function PokemonsPage() {
  const searchParams = useSearchParams();

  const [onlyFavorite, setOnlyFavorite] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [view, setView] = useState<View | null>(null);

  const pokemonTypesQueryResult = usePokemonTypesQuery();
  const pokemonsQueryResult = usePokemonsQuery({
    variables: {
      query: {
        offset: 0,
        limit,
        search,
        filter: {
          type,
          isFavorite: onlyFavorite,
        },
      },
    },
  });

  const gotAllPokemons = useMemo<boolean>(() => (
    isObject(pokemonsQueryResult.data) &&
    pokemonsQueryResult.data.pokemons.count === pokemonsQueryResult.data.pokemons.edges.length
  ), [pokemonsQueryResult.data])

  useEffect(() => {
    const view = localStorage.getItem("view") as unknown;
    setView(isView(view) ? view : "tile");
  }, []);

  useEffect(() => {
    if (!pokemonTypesQueryResult.data?.pokemonTypes) {
      return;
    }

    const favorites = searchParams.get("favorites");
    const type = searchParams.get("type");

    if (
      ![null, ""].includes(favorites) ||
      (type && !pokemonTypesQueryResult.data?.pokemonTypes.includes(type))
    ) {
      redirect("/");
    }

    setOnlyFavorite(favorites === "");
    setType(type ?? "");
  }, [searchParams, pokemonTypesQueryResult.data?.pokemonTypes]);

  if (isNull(onlyFavorite) || isNull(type) || isNull(view)) {
    return <Loading withOverlay={false} />;
  }

  return (
    <>
      {pokemonTypesQueryResult.data?.pokemonTypes && (
        <Header
          onlyFavorite={onlyFavorite}
          onSearch={setSearch}
          pokemonTypes={pokemonTypesQueryResult.data.pokemonTypes}
          type={type}
          view={view}
          onChangedView={(view) => {
            localStorage.setItem("view", view);
            setView(view);
          }}
        />
      )}

      {pokemonsQueryResult.loading && (
        <InlineLoading style={{ margin: "1em" }} />
      )}

      {!pokemonsQueryResult.loading && pokemonsQueryResult.data && pokemonsQueryResult.data.pokemons.edges.length > 0 && (
        <PokemonCards
          pokemons={pokemonsQueryResult.data.pokemons.edges}
          view={view}
          onReachedLastPokemon={() => {
            if (gotAllPokemons || !pokemonsQueryResult.data) {
              return;
            }

            const currentLength = pokemonsQueryResult.data.pokemons.edges.length;
            pokemonsQueryResult.fetchMore({
              variables: merge(pokemonsQueryResult.variables, {
                query: {
                  offset: currentLength,
                },
              }),
            });
          }}
        />
      )}

      {!pokemonsQueryResult.loading && !pokemonsQueryResult.data?.pokemons.edges.length && (
        <div>No pokemons.</div>
      )}
    </>
  );
}
