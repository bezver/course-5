import authAxios from '../interceptors/AuthAxios';
import User from '../models/User';

export default class UserService {
  private static readonly url: string = `${process.env.REACT_APP_SERVER_URL}/users`;

  static async getAll(): Promise<User[]> {
    return authAxios
      .get(UserService.url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Users Error');
      });
  }

  static async getById(id: string): Promise<User> {
    return authAxios
      .get(`${UserService.url}/${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting User Error');
      });
  }
}
