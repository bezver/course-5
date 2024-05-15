import { browser } from "@wdio/globals";
import { v4 as uuid } from "uuid";
import { loginPage } from "../pages/login.page.ts";
import { registerPage } from "../pages/register.page.ts";

export const login = async (username: string, password: string) => {
  await loginPage.open();
  await loginPage.login(username, password);
};

export const registerNewUser = async () => {
  const username = `e2e-${uuid()}`.substring(0, 10);
  const email = `${username}@mail.com`;
  const password = "qwe123!@#";

  await registerPage.open();
  await registerPage.register(username, email, password);

  return { username, email, password };
};

export const loginAsNewUser = async () => {
  const credentials = await registerNewUser();
  await browser.pause(500);
  await login(credentials.username, credentials.password);
  await browser.pause(500);
  return credentials;
};
