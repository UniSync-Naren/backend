import bcrypt from 'bcryptjs';
import { buildResponse } from '../helpers/utils/util';
import { getUser, saveUser } from '../helpers/users';
import { UserInfo } from '../interfaces';

export const register = async (userInfo: UserInfo) => {
  const username = userInfo.username;
  const name = userInfo.name;
  const password = userInfo.password;

  if (!username || !password || !name) {
    return buildResponse(401, {
      message: 'All fields are required',
    });
  }

  //   const dynamoUser = await getUser(username);
  //   if (dynamoUser && dynamoUser.username) {
  //     return buildResponse(401, {
  //       message: 'User already exists',
  //     });
  //   }

  const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
  const user = {
    name: name,
    username: username.toLowerCase(),
    password: encryptedPassword,
  };

  //   const savedUserResponse = await saveUser(user);
  //   if (!savedUserResponse) {
  //     return buildResponse(503, { message: 'server error' });
  //   }

  return buildResponse(200, { username: 'Naren' });
};
