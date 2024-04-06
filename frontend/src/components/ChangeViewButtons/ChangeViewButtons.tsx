import { ShowDataCards, Apps } from "@carbon/icons-react";
import clsx from "clsx";
import classes from "./ChangeViewButtons.module.scss";

export type View = "list" | "tile";

const views: View[] = ["list", "tile"];
export const isView = (view: unknown): view is View => views.includes(view as View);

const viewIcons: Record<View, () => JSX.Element> = {
  list: () => <ShowDataCards />,
  tile: () => <Apps />,
}

interface ChangeViewButtonsProps {
  currentView: View
  onChangedView: (view: View) => void
}

export const ChangeViewButtons = ({ currentView, onChangedView }: ChangeViewButtonsProps) => (
  <div className={classes.buttons}>
    {views.map((view) => (
      <div
        key={view}
        className={clsx(classes.button, { [classes.active]: currentView === view })}
        onClick={() => onChangedView(view)}
      >{viewIcons[view]()}</div>
    ))}
  </div>
);
