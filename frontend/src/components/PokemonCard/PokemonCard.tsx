import React, { LegacyRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { isEqual, isNumber, sortBy, kebabCase } from "lodash-es";
import {
  Pokemon,
  PokemonConnection,
  PokemonsQueryInput,
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

const parseStoreFieldName = (storeFieldName: string) => (
  (JSON.parse(storeFieldName.replace("pokemons:", "")) as { query: PokemonsQueryInput }).query
);

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

  const pokemonNameKebabCased = kebabCase(pokemon.name);
  const pokemonNameEncoded = encodeURI(pokemon.name.toLowerCase());
  const pokemonLink = `/${pokemonNameEncoded}`;
  const pokemonLinkDisabled = pathname === pokemonLink;

  const variables = { id: pokemon.id };
  const onCompleted = <TData extends { id: string, name: string, isFavorite: boolean }>({ id, name, isFavorite }: TData) => {
    addNotification({ id, name, isFavorite });
  };

  const [favorite] = useFavoritePokemonMutation({
    variables,
    onCompleted(data) { data.favoritePokemon && onCompleted(data.favoritePokemon); },
    update(cache) {
      cache.modify({
        fields: {
          pokemons(existing, { storeFieldName, readField }) {
            const query = parseStoreFieldName(storeFieldName);
            if (!query.filter || !query.filter.isFavorite) {
              return existing;
            }

            const foundPokemonRef = cache.identify(pokemon);
            if (!foundPokemonRef) {
              return existing;
            }

            const types = readField<string[]>("types", pokemon);
            if (!types || (query.filter.type && !types.includes(query.filter.type))) {
              return existing;
            }

            const connection = existing as PokemonConnection;
            const edges = sortBy([...connection.edges, { "__ref": foundPokemonRef }], "__ref");

            return {
              ...connection,
              edges,
            };
          },
        },
      });
    }
  });

  const [unfavorite] = useUnFavoritePokemonMutation({
    variables,
    onCompleted(data) { data.unFavoritePokemon && onCompleted(data.unFavoritePokemon); },
    update(cache) {
      cache.modify({
        fields: {
          pokemons(existing, { storeFieldName, readField }) {
            const query = parseStoreFieldName(storeFieldName);
            if (!query.filter || !query.filter.isFavorite) {
              return existing;
            }

            const connection = existing as PokemonConnection;
            const edges = connection.edges.filter((pokemon) => {
              const isFavorite = readField("isFavorite", pokemon);
              return isFavorite;
            });

            return {
              ...connection,
              edges,
            };
          },
        },
      });
    }
  });

  return (
    <div
      className={clsx(classes.pokemon, classes[view])}
      ref={ref}
      data-testid={`pokemon-${pokemonNameKebabCased}`}
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
