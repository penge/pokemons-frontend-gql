"use client";

import { Loading } from "@carbon/react";
import { redirect } from "next/navigation";
import { usePokemonByNameQuery } from "@/api/generated/graphql";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import classes from "./page.module.scss";

export default function PokemonPage({ params }: { params: { name: string } }) {
  const pokemonByNameQueryResult = usePokemonByNameQuery({
    variables: { name: decodeURI(params.name) },
  });

  if (pokemonByNameQueryResult.loading) {
    return <Loading withOverlay={false} />;
  }

  const pokemon = pokemonByNameQueryResult.data?.pokemonByName;
  if (!pokemon) {
    redirect("/");
  }

  return (
    <div className={classes.container}>
      <PokemonCard
        pokemon={pokemon}
        view="large-tile"
      />

      {pokemon.evolutions.length > 0 && (
        <div className={classes.evolutions}>
          <h4>Evolutions</h4>

          <div className={classes.cards}>
            {pokemon.evolutions.map((evolution) => (
              <PokemonCard
                key={evolution.id}
                pokemon={evolution}
                view="tile"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
