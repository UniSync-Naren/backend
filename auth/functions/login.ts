import bcrypt from 'bcryptjs';
import { buildResponse } from '../helpers/utils/util';
import { getUser } from '../helpers/users';
import { User } from '../interfaces';

export const login = async (user: User) => {
  const username = user.username;
  const password = user.password;

  if (!username || !password) {
    return buildResponse(401, {
      message: 'username and password is required',
    });
  }

  // const dynamoUser = await getUser(username);
  // if (!dynamoUser || !dynamoUser.username) {
  //   return buildResponse(401, {
  //     message: 'username incorrect',
  //   });
  // }

  // if (!bcrypt.compareSync(password, dynamoUser.password)) {
  //   return buildResponse(401, {
  //     message: 'Password is wrong',
  //   });
  // }

  // const userInfo = {
  //   username: dynamoUser.username,
  //   name: dynamoUser.name,
  // };

  // const response = {
  //   user: userInfo,
  // };

  const response = {
    user: {
      username: 'naren999',
      name: 'Naren Sreekanth',
    },
  };
  return buildResponse(200, response);
};
