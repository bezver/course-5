import { $, expect } from "@wdio/globals";
import { loginAsNewUser } from "./utils/login.ts";
import { profilePage } from "./pages/profile.page.ts";

describe("Profile", () => {
  it("should display profile for a logged user", async () => {
    const { username } = await loginAsNewUser();
    await profilePage.open()
    expect(await $(`aria/${username}`).isExisting()).toBeTruthy();
  });
});
