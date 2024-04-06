import { PokemonDimension as APokemonDimension } from "@/api/generated/graphql";

interface PokemonDimensionProps {
  title: string
  dimension: APokemonDimension
}

export const PokemonDimension = ({ title, dimension }: PokemonDimensionProps) => {
  return (
    <div>
      <h5>{title}</h5>
      <div>{dimension.minimum} - {dimension.maximum}</div>
    </div>
  );
}
