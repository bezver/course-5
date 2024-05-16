import { Given, Then, When } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { homePage } from "../pages/home.page.ts";
import { loginAsNewUser, registerNewUser } from "../utils/login.ts";

Given("I logged in as a new user", async function() {
  this.credentials = await loginAsNewUser();
});

When("I register a new user", async function() {
  this.credentials = await registerNewUser();
});

Then("I can see the app title", async () => {
  expect(await homePage.textAppName.isExisting()).toBeTruthy();
});