import { Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";

Then("I can see own username", async function () {
  const { username } = this.credentials;
  expect(await $(`aria/${username}`).isExisting()).toBeTruthy();
});
