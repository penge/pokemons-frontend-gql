import { Favorite, FavoriteFilled } from "@carbon/icons-react";
import classes from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  isFavorite: boolean
  onClick: () => void
}

export const FavoriteButton = (props: FavoriteButtonProps) => (
  <div className={classes.button} onClick={props.onClick}>
    {props.isFavorite ? <FavoriteFilled /> : <Favorite />}
  </div>
);
