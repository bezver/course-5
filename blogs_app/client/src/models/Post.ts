import User from './User';

export default class Post {
  _id?: string;
  message?: string;
  createdAt?: string;
  author?: User;
}
