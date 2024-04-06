"use client";

import React from "react";
import { useReactiveVar } from "@apollo/client";
import { notificationsVar } from "@/api/notifications";
import { FavoriteToastNotification } from "@/components/FavoriteToastNotification/FavoriteToastNotification";
import classes from "./Notifications.module.scss";

const Notifications = () => {
  const notifications = useReactiveVar(notificationsVar);

  return (
    <div className={classes.container}>
      {notifications.map((notification) => (
        <FavoriteToastNotification
          key={`${notification.id}-${notification.isFavorite}`}
          {...notification}
          onClose={(id) => {
            notificationsVar(
              notificationsVar().filter((notification) => notification.id !== id)
            );
          }}
        />
      ))}
    </div>
  );
};

export default Notifications;
