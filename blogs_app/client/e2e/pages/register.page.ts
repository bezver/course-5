import { $ } from '@wdio/globals';
import Page from './page.ts';

class RegisterPage extends Page {
    get inputUsername () {
        return $("#username");
    }

    get inputEmail () {
        return $("#email");
    }

    get inputPassword () {
        return $('#password');
    }

    get inputConfirmPassword () {
        return $('#confirmPassword');
    }

    get containerRegisterError () {
        return $("=Register error");
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    async register (username: string, email: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputConfirmPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('register');
    }
}

export const registerPage = new RegisterPage();
