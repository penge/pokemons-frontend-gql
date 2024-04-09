import { useMemo } from "react";
import { ContentSwitcher, Switch, Search, Select, SelectItem } from "@carbon/react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash-es";
import { ChangeViewButtons, View } from "../ChangeViewButtons/ChangeViewButtons";
import classes from "./Header.module.scss";

interface HeaderProps {
  onlyFavorite: boolean
  onSearch: (search: string) => void
  pokemonTypes: string[]
  type: string
  view: View
  onChangedView: (view: View) => void
}

export const Header = ({
  onlyFavorite,
  onSearch,
  pokemonTypes,
  type,
  view,
  onChangedView,
}: HeaderProps) => {
  const debouncedOnSearch = useMemo(() => debounce(onSearch, 200), [onSearch]);
  const router = useRouter();

  const push = ({ onlyFavorite, type }: { onlyFavorite: boolean, type: string }) => {
    const onlyFavoriteParam = onlyFavorite ? "favorites" : "";
    const typeParam = type ? `type=${type}` : "";
    const params = [onlyFavoriteParam, typeParam].filter(Boolean).join("&");
    return router.push(params ? `/?${params}` : "/");
  }

  return (
    <header className={classes.header}>
      <div className={classes.row}>
        <ContentSwitcher
          onChange={({ index }) => push({ onlyFavorite: index === 1, type })}
          selectedIndex={onlyFavorite ? 1 : 0}
          size="lg"
        >
          <Switch text="All" data-testid="all-button" />
          <Switch text="Favorites" data-testid="favorites-button" />
        </ContentSwitcher>
      </div>

      <div className={classes.row}>
        <Search
          id="pokemon-search"
          size="md"
          placeholder="Search"
          labelText=""
          onChange={(event) => {
            const search = event.target.value;
            (search ? debouncedOnSearch : onSearch)(search);
          }}
          data-testid="search-input"
        />

        <Select
          id="pokemon-type-select"
          className={classes.select}
          labelText=""
          onChange={(event) => push({ onlyFavorite, type: event.target.value })}
          defaultValue={type}
          noLabel
          data-testid="type-filter"
        >
          <SelectItem value="" text="(Any type)" />
          {pokemonTypes.map((pokemonType) => (
            <SelectItem key={pokemonType} value={pokemonType} text={pokemonType} />
          ))}
        </Select>

        <ChangeViewButtons
          currentView={view}
          onChangedView={onChangedView}
        />
      </div>
    </header>
  );
}
