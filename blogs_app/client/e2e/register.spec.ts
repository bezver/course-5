import { expect } from "@wdio/globals";
import { registerPage } from "./pages/register.page.ts";
import { registerNewUser } from "./utils/login.ts";

describe("Registration", () => {
  it("should register a new user", async () => {
    await registerNewUser();
    expect(await registerPage.containerRegisterError.isExisting()).toBeFalsy();
  });
});
