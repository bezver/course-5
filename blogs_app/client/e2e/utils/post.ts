import { blogPage } from "../pages/blog.page.ts";

export const createPost = async (postMessage: string) => {
  await blogPage.open();
  await blogPage.createPost(postMessage);
};
