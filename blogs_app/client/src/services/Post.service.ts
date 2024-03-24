import authAxios from '../interceptors/AuthAxios';
import Post from '../models/Post';

export default class PostService {
  private static readonly url: string = `${process.env.REACT_APP_SERVER_URL}/posts`;

  static async getAll(): Promise<Post[]> {
    return authAxios
      .get(PostService.url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Posts Error');
      });
  }

  static async listByAuthor(userId: string): Promise<Post[]> {
    return authAxios
      .get(`${PostService.url}/?userId=${userId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Posts for User Error');
      });
  }

  static async getById(id: string): Promise<Post> {
    return authAxios
      .get(`${PostService.url}/${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Post Error');
      });
  }

  static async create(post: Post): Promise<Post> {
    return authAxios
      .post(`${PostService.url}`, post)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Creating Post Error');
      });
  }

  static async update(id: string, post: Post): Promise<Post> {
    return authAxios
      .patch(`${PostService.url}/${id}`, post)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Updating Post Error');
      });
  }

  static async delete(id: string): Promise<Post> {
    return authAxios
      .delete(`${PostService.url}/${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Deleting Post Error');
      });
  }
}
