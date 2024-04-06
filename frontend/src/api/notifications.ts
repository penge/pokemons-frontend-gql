import { makeVar } from "@apollo/client";
import { Pokemon } from "./generated/graphql";

export type Notification = Pick<Pokemon, "id" | "name" | "isFavorite">;

export const notificationsVar = makeVar<Notification[]>([]);
export const addNotification = (notification: Notification) => {
  notificationsVar([
    ...notificationsVar().filter((n) => n.id !== notification.id),
    notification,
  ]);
}
