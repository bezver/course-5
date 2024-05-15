import { homePage } from "./home.page.ts";
import Page from "./page.ts";

class ProfilePage extends Page {
  async open() {
    await homePage.open();
    await homePage.iconMenu.click();
    await homePage.iconMenuProfile.click();
    await browser.pause(500);
    return browser.getUrl();
  }
}

export const profilePage = new ProfilePage();
