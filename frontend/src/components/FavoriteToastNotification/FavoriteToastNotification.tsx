import { ToastNotification } from "@carbon/react";
import { Notification } from "@/api/notifications";
import classes from "./FavoriteToastNotification.module.scss";

type FavoriteToastNotificationProps = Notification & {
  onClose: (id: string) => void
}

export const FavoriteToastNotification = ({
  id, name, isFavorite, onClose,
}: FavoriteToastNotificationProps) => (
  <ToastNotification
    key={`${id}-${isFavorite}`}
    kind="info-square"
    className={classes.notification}
    timeout={3000}
    title={name}
    subtitle={isFavorite ? "♥ Added to Favorites." : "♡ Removed from Favorites."}
    onClose={() => onClose(id)}
  />
);
