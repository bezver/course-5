import { $, expect } from "@wdio/globals";
import { loginAsNewUser } from "./utils/login.ts";

describe("Post", () => {
  it("should create post", async () => {
    const postMessage = "test content";

    // Open posts page
    await loginAsNewUser();
    await $('//*[@data-testid="MenuIcon"]').click();
    await $('//*[@data-testid="my-blog-menu-item"]').click();

    // Add post
    await $("aria/Share your thoughts :)").setValue(postMessage)
    await $('button[type="submit"]').click();

    const postMessageElementText = await $('[data-testid="post-message"]').getText();
    expect(postMessageElementText).toBe(postMessage);
  });
});