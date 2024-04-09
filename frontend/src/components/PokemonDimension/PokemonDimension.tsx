import { PokemonDimension as APokemonDimension } from "@/api/generated/graphql";

interface PokemonDimensionProps {
  title: string
  dimension: APokemonDimension
}

export const PokemonDimension = ({ title, dimension }: PokemonDimensionProps) => {
  return (
    <div>
      <h5>{title}</h5>
      <div>
        <span data-testid={`pokemon-minimum-${title.toLowerCase()}`}>{dimension.minimum}</span>
        {" - "}
        <span data-testid={`pokemon-maximum-${title.toLowerCase()}`}>{dimension.maximum}</span>
      </div>
    </div>
  );
}
