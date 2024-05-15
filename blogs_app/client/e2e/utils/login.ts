import { $, browser } from "@wdio/globals";
import { v4 as uuid } from "uuid";

export const login = async (username, password) => {
  await browser.url("http://localhost:3000/login");
  await $("#username").setValue(username);
  await $("#password").setValue(password);
  await $('button[type="submit"]').click();
};

export const registerNewUser = async () => {
  const username = `e2e-${uuid()}`.substring(0, 10);
  const email = `${username}@mail.com`;
  const password = "qwe123!@#";
  await browser.url("http://localhost:3000/login");
  await $("=Don't have an account? Sign Up").click();

  await $("#username").setValue(username);
  await $("#email").setValue(email);
  await $("#password").setValue(password);
  await $("#confirmPassword").setValue(password);
  await $('button[type="submit"]').click();

  return { username, email, password };
};

export const loginAsNewUser = async () => {
  const credentials = await registerNewUser();
  await browser.pause(500);
  await login(credentials.username, credentials.password);
  return credentials;
};
