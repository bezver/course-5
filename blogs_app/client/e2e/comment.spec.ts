import { expect } from "@wdio/globals";
import { commentPage } from "./pages/comment.page.ts";
import { loginAsNewUser } from "./utils/login.ts";
import { createPost } from "./utils/post.ts";

describe("Comment", () => {
  beforeEach(async () => {
    await loginAsNewUser();
    await createPost("test post");
  });

  it("should create comment", async () => {
    const commentText = "test comment";
    await commentPage.open();
    await commentPage.createComment(commentText);

    const commentElementText = await commentPage.elementCommentMessageText.getText();
    expect(commentElementText).toBe(commentText);
  });
});
