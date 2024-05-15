import { $ } from "@wdio/globals";
import Page from "./page.ts";

class LoginPage extends Page {
  get inputUsername() {
    return $("#username");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  open() {
    return super.open("login");
  }
}

export const loginPage = new LoginPage();
