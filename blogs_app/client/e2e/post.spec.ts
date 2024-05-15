import { expect } from "@wdio/globals";
import { blogPage } from "./pages/blog.page.ts";
import { loginAsNewUser } from "./utils/login.ts";
import { createPost } from "./utils/post.ts";

describe("Post", () => {
  it("should create post", async () => {
    await loginAsNewUser();
    const postMessage = "test content";
    await createPost(postMessage);

    const postMessageElementText = await blogPage.elementPostMessageText.getText();
    expect(postMessageElementText).toBe(postMessage);
  });
});