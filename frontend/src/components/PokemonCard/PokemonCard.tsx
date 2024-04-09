import React, { LegacyRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { isEqual, isNumber } from "lodash-es";
import {
  Pokemon,
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from "@/api/generated/graphql";
import { Scale } from "@carbon/icons-react";
import { View } from "@/components/ChangeViewButtons/ChangeViewButtons";
import { PokemonImage } from "@/components/PokemonImage/PokemonImage";
import { PokemonSound } from "../PokemonSound/PokemonSound";
import { FavoriteButton } from "@/components/FavoriteButton/FavoriteButton";
import { PokemonProgressBar } from "@/components/PokemonProgressBar/PokemonProgressBar";
import { PokemonDimension } from "@/components/PokemonDimension/PokemonDimension";
import { addNotification } from "@/api/notifications";
import classes from "./PokemonCard.module.scss";

export type PokemonCard =
  Pick<Pokemon, "id" | "name" | "image" | "isFavorite">
  & Partial<Pick<Pokemon, "sound" | "types" | "maxCP" | "maxHP" | "weight" | "height">>;

interface PokemonCardProps {
  pokemon: PokemonCard
  view: View | "medium-tile" | "large-tile"
  onDetail?: () => void
}

export const PokemonCard = React.memo(React.forwardRef(({ pokemon, view, onDetail }: PokemonCardProps, ref?: LegacyRef<HTMLDivElement>) => {
  const pathname = usePathname();

  const pokemonLowerCasedName = pokemon.name.toLowerCase();
  const pokemonLink = `/${pokemonLowerCasedName}`;
  const pokemonLinkDisabled = pathname === pokemonLink;

  const variables = { id: pokemon.id };
  const onCompleted = <TData extends { id: string, name: string, isFavorite: boolean }>({ id, name, isFavorite }: TData) => {
    addNotification({ id, name, isFavorite });
  };

  const [favorite] = useFavoritePokemonMutation({
    variables,
    onCompleted(data) { data.favoritePokemon && onCompleted(data.favoritePokemon); }
  });

  const [unfavorite] = useUnFavoritePokemonMutation({
    variables,
    onCompleted(data) { data.unFavoritePokemon && onCompleted(data.unFavoritePokemon); }
  });

  return (
    <div
      className={clsx(classes.pokemon, classes[view])}
      ref={ref}
      data-testid={`pokemon-${pokemonLowerCasedName}`}
    >
      <div className={classes["image-container"]}>
        {view === "tile" && onDetail && (
          <Scale className={classes.scale} onClick={onDetail} />
        )}

        <Link
          href={pokemonLink}
          className={clsx({ [classes.disabled]: pokemonLinkDisabled })}
        >
          <PokemonImage
            image={pokemon.image}
            name={pokemon.name}
            size={{
              list: { width: "100px", height: "100px" },
              tile: { width: "200px", height: "250px" },
              "medium-tile": { width: "320px", height: "320px" },
              "large-tile": { width: "400px", height: "400px" },
            }[view]}
          />
        </Link>

        {pokemon.sound && (
          <div className={classes.sound}>
            <PokemonSound sound={pokemon.sound} />
          </div>
        )}
      </div>

      <div className={classes.footer}>
        <div className={classes.info}>
          <Link
            href={pokemonLink}
            className={clsx(classes.name, { [classes.disabled]: pokemonLinkDisabled })}
            data-testid="pokemon-name"
          >{pokemon.name}</Link>

          {pokemon.types && pokemon.types.length > 0 && (
            <span data-testid="pokemon-types">{pokemon.types.join(", ")}</span>
          )}
        </div>

        <FavoriteButton
          isFavorite={pokemon.isFavorite}
          onClick={pokemon.isFavorite ? unfavorite : favorite}
        />
      </div>

      {isNumber(pokemon.maxCP) && (
        <div className={clsx(classes.footer, classes.progress)}>
          <PokemonProgressBar status="error" />
          <span>CP: <span data-testid="pokemon-cp">{pokemon.maxCP}</span></span>
        </div>
      )}

      {isNumber(pokemon.maxHP) && (
        <div className={clsx(classes.footer, classes.progress)}>
          <PokemonProgressBar status="active" />
          <span>HP: <span data-testid="pokemon-hp">{pokemon.maxHP}</span></span>
        </div>
      )}

      {pokemon.weight && pokemon.height && (
        <div className={clsx(classes.footer, classes.dimensions)}>
          <PokemonDimension title="Weight" dimension={pokemon.weight} />
          <div className={classes.separator} />
          <PokemonDimension title="Height" dimension={pokemon.height} />
        </div>
      )}
    </div>
  );
}), (prevProps, nextProps) => isEqual(prevProps, nextProps));

PokemonCard.displayName = "PokemonCard";
