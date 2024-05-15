import { $, expect } from "@wdio/globals";
import { loginAsNewUser } from "./utils/login.ts";
import { createPost } from "./utils/post.ts";

describe("Comment", () => {
  beforeEach(async () => {
    await loginAsNewUser();
    await createPost("test post");
  });

  it("should create comment", async () => {
    const commentText = "test comment";
    await $('[data-testid="post-comments-button"]').click();
    await $('[data-testid="comment-message-input"] textarea').setValue(commentText);
    await $('button[type="submit"]').click();

    const commentElementText = await $('[data-testid="comment-message-text"]').getText();
    expect(commentElementText).toBe(commentText);
  });
});