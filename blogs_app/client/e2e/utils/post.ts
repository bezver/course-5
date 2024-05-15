export const createPost = async (postMessage: string) => {
  await browser.url("http://localhost:3000/");

  await $('//*[@data-testid="MenuIcon"]').click();
  await $('//*[@data-testid="my-blog-menu-item"]').click();

  // Add post
  await $("aria/Share your thoughts :)").setValue(postMessage)
  await $('button[type="submit"]').click();
}