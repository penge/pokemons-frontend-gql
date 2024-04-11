import { test } from "@playwright/test";

test("navigates to pokemon detail by clicking on its name", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("pokemon-bulbasaur").getByTestId("pokemon-name").click();
  await page.waitForURL("/bulbasaur");
});

test("navigates to pokemon detail by clicking on its image", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("pokemon-bulbasaur").getByTestId("pokemon-image").click();
  await page.waitForURL("/bulbasaur");
});

test("navigates to pokemon detail of evolved pokemon", async ({ page }) => {
  await page.goto("/bulbasaur");

  await page.getByTestId("pokemon-ivysaur").getByTestId("pokemon-image").click();
  await page.waitForURL("/ivysaur");

  await page.getByTestId("pokemon-venusaur").getByTestId("pokemon-image").click();
  await page.waitForURL("/venusaur");
});

test("navigates to pokemon detail of pokemon with URI encoded name", async ({ page }) => {
  await page.goto("/mr. mime");
  await page.waitForURL("/mr.%20mime");
  await page.getByTestId("pokemon-mr-mime");

  await page.goto("/farfetch'd");
  await page.waitForURL("/farfetch'd");
  await page.getByTestId("pokemon-farfetchd");
});
