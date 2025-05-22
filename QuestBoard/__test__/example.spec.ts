import { test, expect } from "@playwright/test";

test.describe("main tests", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/QuestBoard/);
  });

  test("fill the input and valid input", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/");
    await page.getByTestId("input-quetes").fill("example value");
    await page.getByRole("button", { name: /ajouter/i }).click();
    await page.waitForTimeout(500); // obliger car fail 1/2 pour firefox
    // await expect(page.getByTestId("list-quetes")).toHaveValue("example value");
    await expect(page.getByText("example value")).toBeVisible(); // le mieux aurait été de vérifier avec le testid
    // il faut qu'il y a seulement un example value sinon il ne sait pas lequel choisir pour verifier
  });

  test("has checkbox", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("checkbox").check; // check si il y'a des checkboxs (adapté pour MUI)
  });

  test("edit a quest", async ({ page }) => {
    await page.goto("/");
    await page
      .getByTestId(/^btn-edit-/)
      .first()
      .click();
    await page.getByTestId("textfield-edit").fill("edited");
    await page
      .getByTestId(/^btn-sauvegarder/)
      .first()
      .click();
    await expect(page.getByText("edited")).toBeVisible();
  });

  // je voulais faire le test avec les ids mais vue que ceux de firebase sont aléatoires et trop long pas possible
  test("valid a quest", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("checkbox").nth(0).check();
    await page.getByTestId("btn-valid").click();
    await expect(page.getByText("edited")).not.toBeVisible(); // edited car il valide la première quête donc celle modifié en edited
  });

  // je voulais faire le test avec les ids mais vue que ceux de firebase sont aléatoires et trop long pas possible
  test("delete a quest", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("example value")).toBeVisible();
    await page.getByTestId("btn-close").nth(0).click();
    await expect(page.getByText("example value")).not.toBeVisible;
  });
});
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
