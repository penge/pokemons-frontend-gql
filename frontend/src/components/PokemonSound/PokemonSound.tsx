import { useEffect, useMemo } from "react";
import { PlayFilledAlt } from "@carbon/icons-react";
import classes from "./PokemonSound.module.scss";

interface PokemonSoundProps {
  sound: string
}

export const PokemonSound = ({ sound }: PokemonSoundProps) => {
  const { play, pause } = useMemo(() => {
    const audio = new Audio(sound);

    const play = () => { audio.play(); };
    const pause = () => { audio.pause(); }

    return { play, pause };
  }, [sound]);

  useEffect(() => {
    return () => {
      pause();
    }
  }, [pause]);

  return (
    <PlayFilledAlt
      size={48}
      className={classes.play}
      onClick={play}
      data-testid="play-pokemon-sound-button"
      data-sound={sound}
    />
  );
}
