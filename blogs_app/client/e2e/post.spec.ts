import { $, expect } from "@wdio/globals";
import { loginAsNewUser } from "./utils/login.ts";
import { createPost } from "./utils/post.ts";

describe("Post", () => {
  it("should create post", async () => {
    await loginAsNewUser();
    const postMessage = "test content";
    createPost(postMessage);

    const postMessageElementText = await $('[data-testid="post-message"]').getText();
    expect(postMessageElementText).toBe(postMessage);
  });
});