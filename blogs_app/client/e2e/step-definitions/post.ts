import { Then, When } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { blogPage } from "../pages/blog.page.ts";
import { createPost } from "../utils/post.ts";

When(/^I create a post with message: "([\w ]+)"$/, async function (message: string) {
  await createPost(message);
});

Then(/^I can see a post with message: "([\w ]+)"$/, async function (message: string) {
  const postMessageElementText = await blogPage.elementPostMessageText.getText();
  expect(postMessageElementText).toBe(message);
});
