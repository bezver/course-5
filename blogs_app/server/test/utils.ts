import { User } from "../src/_schemas/User.schema";

export const createUserMock = (
  id: string,
  username: string = "",
  email: string = "",
  passwordHash: string = "",
  verified: boolean = false,
): User => {
  const user = new User();
  user._id = id;
  user.username = username;
  user.email = email;
  user.passwordHash = passwordHash;
  user.verified = verified;

  return user;
};
