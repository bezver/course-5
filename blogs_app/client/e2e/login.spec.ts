import { expect } from "@wdio/globals";
import { homePage } from "./pages/home.page.ts";
import { loginAsNewUser } from "./utils/login.ts";

describe("Login", () => {
  it("should login as a new user", async () => {
    await loginAsNewUser();
    expect(await homePage.textAppName.isExisting()).toBeTruthy();
  });
});
