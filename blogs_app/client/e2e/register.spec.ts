import { $, expect } from "@wdio/globals";
import { registerNewUser } from "./utils/login.ts";

describe("Registration", () => {
  it("should register a new user", async () => {
    await registerNewUser();
    expect(await $("=Register error").isExisting()).toBeFalsy();
  });
});
