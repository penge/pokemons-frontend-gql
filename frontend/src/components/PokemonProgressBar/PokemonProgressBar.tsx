import { ProgressBar } from "@carbon/react";
import classes from "./PokemonProgressBar.module.scss";

type PokemonProgressBarProps = {
  status: "active" | "error"
}

export const PokemonProgressBar = ({ status }: PokemonProgressBarProps) => (
  <ProgressBar status={status} className={classes.progress} label="" hideLabel value={100} />
);
