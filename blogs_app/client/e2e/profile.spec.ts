import { $, expect } from "@wdio/globals";
import { loginAsNewUser } from "./utils/login.ts";

describe("Profile", () => {
  it("should display profile for a logged user", async () => {
    const { username } = await loginAsNewUser();
    await browser.$('//*[@data-testid="MenuIcon"]').click();
    await browser.$('//*[@data-testid="profile-menu-item"]').click();
    expect(await $(`aria/${username}`).isExisting()).toBeTruthy();
  });
});
