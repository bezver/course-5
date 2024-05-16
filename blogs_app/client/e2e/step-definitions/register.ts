import { Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { registerPage } from "../pages/register.page.ts";

Then("No register error is shown", async () => {
  expect(await registerPage.containerRegisterError.isExisting()).toBeFalsy();
});
