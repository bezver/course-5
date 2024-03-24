import User from './User';

export default class Comment {
  _id?: string;
  message?: string;
  createdAt?: string;
  post?: string;
  author?: User;
}
