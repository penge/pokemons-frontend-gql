import { test } from "@playwright/test";

test("presence of data-testid(s)", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("all-button");
  await page.getByTestId("favorites-button");
  await page.getByTestId("search-input");
  await page.getByTestId("type-filter");
  await page.getByTestId("list-view-button");
  await page.getByTestId("tile-view-button");

  await page.getByTestId("pokemon-bulbasaur");
  await page.getByTestId("pokemon-charizard");
});
