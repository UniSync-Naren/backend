import bcrypt from 'bcryptjs';
import { buildResponse } from '../helpers/utils/util';
import { getUser, saveUser } from '../helpers/users';
import { UserInfo } from '../interfaces';

export const register = async (userInfo: UserInfo) => {
  // Check if all info is available
  function credEntered(username: string, name: string, password: string) {
    if (!username || !password || !name) {
      throw new Error('All fields are required');
    }
  }

  // Check if username already exists
  async function usernameExists(username: string) {
    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
      throw new Error('User already exists');
    }
  }

  async function createUser(user: UserInfo) {
    const savedUserResponse = await saveUser(user);
    if (!savedUserResponse) {
      throw new Error('server error');
    }
  }

  const username = userInfo.username;
  const name = userInfo.name;
  const password = userInfo.password;

  try {
    credEntered(username, name, password);
    await usernameExists(username);

    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
      name: name,
      username: username.toLowerCase(),
      password: encryptedPassword,
    };

    await createUser(user);

    const response = {
      user: user,
    };

    return buildResponse(200, response);
  } catch (err) {
    const error = err as Error; // Type assertion

    const response = {
      message: error.message,
    };

    return buildResponse(401, response);
  }
};
