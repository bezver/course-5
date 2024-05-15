import { $, expect } from "@wdio/globals";
import { loginAsNewUser } from "./utils/login.ts";

describe("Login", () => {
  it("should login as a new user", async () => {
    await loginAsNewUser();
    await new Promise(r => setTimeout(r, 5000));
    expect(await $('//*[@data-testid="app-name"]').isExisting()).toBeTruthy();
  });
});
