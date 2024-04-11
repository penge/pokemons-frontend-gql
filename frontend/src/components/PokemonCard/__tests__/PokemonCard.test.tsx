import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { pick } from "lodash-es";
import { Providers } from "@/components/Providers/Providers";
import { PokemonCard } from "../PokemonCard";

const bulbasaur = {
  "id": "001",
  "name": "Bulbasaur",
  "image": "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  "sound": "http://localhost:4000/sounds/1",
  "isFavorite": true,
  "types": [
    "Grass",
    "Poison"
  ],
  "weight": {
    "minimum": "6.04kg",
    "maximum": "7.76kg"
  },
  "height": {
    "minimum": "0.61m",
    "maximum": "0.79m"
  },
  "maxCP": 951,
  "maxHP": 1071,
};

test("PokemonCard - basic info", () => {
  render(
    <Providers>
      <PokemonCard
        pokemon={pick(bulbasaur, ["id", "name", "image", "isFavorite", "types"])}
        view="tile"
      />
    </Providers>
  );

  expect(screen.getByTestId("pokemon-bulbasaur"));
  expect(screen.getByTestId("pokemon-image").getAttribute("src")).toBe("https://img.pokemondb.net/artwork/bulbasaur.jpg");
  expect(screen.getByTestId("pokemon-name").textContent).toBe("Bulbasaur");
  expect(screen.getByTestId("pokemon-types").textContent).toBe("Grass, Poison");
  expect(screen.getByTestId("toggle-favorite-pokemon-button").getAttribute("data-isfavorite")).toBe("true");
});

test("PokemonCard - all info", () => {
  render(
    <Providers>
      <PokemonCard
        pokemon={bulbasaur}
        view="tile"
      />
    </Providers>
  );

  expect(screen.getByTestId("play-pokemon-sound-button").getAttribute("data-sound")).toBe("http://localhost:4000/sounds/1");

  expect(screen.getByTestId("pokemon-cp").textContent).toBe("951");
  expect(screen.getByTestId("pokemon-hp").textContent).toBe("1071");

  expect(screen.getByTestId("pokemon-minimum-weight").textContent).toBe("6.04kg");
  expect(screen.getByTestId("pokemon-maximum-weight").textContent).toBe("7.76kg");

  expect(screen.getByTestId("pokemon-minimum-height").textContent).toBe("0.61m");
  expect(screen.getByTestId("pokemon-maximum-height").textContent).toBe("0.79m");
});

test("PokemonCard - name with special characters", () => {
  render(
    <Providers>
      <PokemonCard
        pokemon={{
          id: "122",
          name: "Mr. Mime",
          image: "https://img.pokemondb.net/artwork/mr-mime.jpg",
          isFavorite: true,
        }}
        view="tile"
      />
    </Providers>
  );

  expect(screen.getByTestId("pokemon-mr-mime"));

  render(
    <Providers>
      <PokemonCard
        pokemon={{
          "id": "083",
          "name": "Farfetch'd",
          image: "https://img.pokemondb.net/artwork/farfetchd.jpg",
          isFavorite: true,
        }}
        view="tile"
      />
    </Providers>
  );

  expect(screen.getByTestId("pokemon-farfetchd"));
});
