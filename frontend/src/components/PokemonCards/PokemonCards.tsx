import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import { InlineLoading, Modal } from "@carbon/react";
import { View } from "@/components/ChangeViewButtons/ChangeViewButtons";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import classes from "./PokemonCards.module.scss";
import { usePokemonByNameLazyQuery } from "@/api/generated/graphql";

interface PokemonCardsProps {
  pokemons: PokemonCard[]
  view: View
  onReachedLastPokemon: () => void
}

export const PokemonCards = ({ pokemons, view, onReachedLastPokemon }: PokemonCardsProps) => {
  const [getPokemonByName, { loading, data }] = usePokemonByNameLazyQuery();
  const [open, setOpen] = useState(false);

  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView && entry) {
      onReachedLastPokemon();
    }
  }, [inView, entry, onReachedLastPokemon]);

  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onRequestClose={() => setOpen(false)}
        passiveModal
      >
        {open && loading && <InlineLoading style={{ margin: "1em" }} />}
        {open && !loading && data?.pokemonByName && (
          <PokemonCard
            pokemon={data.pokemonByName}
            view="medium-tile"
          />
        )}
      </Modal>

      <div className={clsx(classes.pokemons, classes[view])}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            view={view}
            ref={index === pokemons.length - 1 ? ref : null}
            onDetail={() => {
              setOpen(true);
              getPokemonByName({ variables: { name: pokemon.name } });
            }}
          />
        ))}
      </div>
    </>
  );
}
