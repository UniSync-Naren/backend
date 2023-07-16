import bcrypt from 'bcryptjs';
import { buildResponse } from '../helpers/utils/util';
import { getUser } from '../helpers/users';
import { User } from '../interfaces';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const login = async (user: User) => {
  // Check if username and password is entered
  function credEntered(username: string, password: string) {
    if (!username || !password) {
      throw new Error('username and password is required');
    }
  }

  // Check if username exists
  function checkUsername(dynamoUser: void | DocumentClient.AttributeMap | undefined) {
    if (!dynamoUser || !dynamoUser.username) {
      throw new Error('username incorrect');
    }
  }

  // Check if password is correct
  function checkPassword(dynamoUser: void | DocumentClient.AttributeMap | undefined, password: string) {
    if (!bcrypt.compareSync(password, dynamoUser?.password)) {
      throw new Error('Password is wrong');
    }
  }

  const username = user.username;
  const password = user.password;

  try {
    credEntered(username, password);
    const dynamoUser = await getUser(username);
    checkUsername(dynamoUser);
    checkPassword(dynamoUser, password);

    const userInfo = {
      username: dynamoUser?.username,
      name: dynamoUser?.name,
    };

    const response = {
      user: userInfo,
    };

    return buildResponse(200, response);
  } catch (err) {
    // Handle errors thrown by the inner functions
    const error = err as Error; // Type assertion

    const response = {
      message: error.message,
    };

    return buildResponse(401, response);
  }
};
