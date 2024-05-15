import { $ } from "@wdio/globals";
import Page from "./page.ts";

class HomePage extends Page {
  get iconMenu() {
    return $('//*[@data-testid="MenuIcon"]');
  }

  get iconMenuProfile() {
    return $('//*[@data-testid="profile-menu-item"]');
  }

  get iconMenuBlog() {
    return $('//*[@data-testid="my-blog-menu-item"]');
  }

  get textAppName() {
    return $('//*[@data-testid="app-name"]');
  }

  async open() {
    return super.open("");
  }
}

export const homePage = new HomePage();
