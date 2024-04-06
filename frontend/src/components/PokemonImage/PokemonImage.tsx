import classes from "./PokemonImage.module.scss";

interface PokemonImageProps {
  image: string
  name: string
  size: {
    width: string
    height: string
  }
}

export const PokemonImage = ({ image, name, size: { width, height } }: PokemonImageProps) => (
  <div className={classes["image-container"]} style={{ width, height }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={image} alt={name} />
  </div>
);
