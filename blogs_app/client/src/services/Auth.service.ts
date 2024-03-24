import authAxios from '../interceptors/AuthAxios';
import axios from 'axios';
import { IdentityUser } from '../models/IdentityUser';
import { LoginCredentials, RegisterCredentials } from '../models/Credentials';

export default class AuthService {
  private static readonly url: string = `${process.env.REACT_APP_SERVER_URL}/auth`;

  static async register(credentials: RegisterCredentials): Promise<void> {
    return axios
      .post(`${AuthService.url}/register`, credentials)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Register Error');
      });
  }

  static async login(credentials: LoginCredentials): Promise<string> {
    return axios
      .post(`${AuthService.url}/login`, credentials)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Login Error');
      });
  }

  static async sendResetPasswordLink(username: string): Promise<void> {
    return axios
      .post(`${AuthService.url}/send-reset-password-link`, { username })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Reset Password Error');
      });
  }

  static async verifyUser(verificationToken: string): Promise<string> {
    return axios
      .post(`${AuthService.url}/verify-user`, { verificationToken })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('User verification Error');
      });
  }

  static async resetPassword(resetToken: string, password: string): Promise<string> {
    return axios
      .post(`${AuthService.url}/reset-password`, { resetToken, password })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('User verification Error');
      });
  }

  static async getIdentityUser(): Promise<IdentityUser> {
    return authAxios
      .post(`${AuthService.url}/get-identity-user`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Verification Error');
      });
  }
}
