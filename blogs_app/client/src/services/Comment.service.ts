import authAxios from '../interceptors/AuthAxios';
import Comment from '../models/Comment';

export default class CommentService {
  private static readonly url: string = `${process.env.REACT_APP_SERVER_URL}/comments`;

  static async getAll(): Promise<Comment[]> {
    return authAxios
      .get(CommentService.url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Comments Error');
      });
  }

  static async getAllForPost(postId: string): Promise<Comment[]> {
    return authAxios
      .get(`${CommentService.url}/?postId=${postId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Comments for Post Error');
      });
  }

  static async getById(id: string): Promise<Comment> {
    return authAxios
      .get(`${CommentService.url}/${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Getting Comment Error');
      });
  }

  static async create(comment: Comment): Promise<Comment> {
    return authAxios
      .post(`${CommentService.url}`, comment)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Creating Comment Error');
      });
  }

  static async update(id: string, comment: Comment): Promise<Comment> {
    return authAxios
      .patch(`${CommentService.url}/${id}`, comment)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Updating Comment Error');
      });
  }

  static async delete(id: string): Promise<Comment> {
    return authAxios
      .delete(`${CommentService.url}/${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error?.response?.data || new Error('Deleting Comment Error');
      });
  }
}
