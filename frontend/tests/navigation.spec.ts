import { test } from "@playwright/test";

test("navigates to pokemon detail by clicking on its name", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("pokemon-bulbasaur").getByTestId("pokemon-name").click();
  await page.waitForURL('/bulbasaur');
});

test("navigates to pokemon detail by clicking on its image", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("pokemon-bulbasaur").getByTestId("pokemon-image").click();
  await page.waitForURL('/bulbasaur');
});

test("navigates to pokemon detail of evolved pokemon", async ({ page }) => {
  await page.goto("/bulbasaur");

  await page.getByTestId("pokemon-ivysaur").getByTestId("pokemon-image").click();
  await page.waitForURL('/ivysaur');

  await page.getByTestId("pokemon-venusaur").getByTestId("pokemon-image").click();
  await page.waitForURL('/venusaur');
});
