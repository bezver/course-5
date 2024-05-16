import { Given } from "@wdio/cucumber-framework";
import { blogPage } from "../pages/blog.page.ts";
import { commentPage } from "../pages/comment.page.ts";
import { homePage } from "../pages/home.page.ts";
import { loginPage } from "../pages/login.page.ts";
import { profilePage } from "../pages/profile.page.ts";
import { registerPage } from "../pages/register.page.ts";

const pages = {
  blog: blogPage,
  login: loginPage,
  comment: commentPage,
  home: homePage,
  profile: profilePage,
  register: registerPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

