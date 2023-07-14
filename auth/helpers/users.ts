// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';

// Set the region
AWS.config.update({ region: 'ap-southeast-1' });
// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const userTable = 'users';

interface User {
  username: string;
  name: string;
  password: string;
}

export const getUser = async (username: string) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  return await dynamoDB
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.Item;
      },
      (error) => {
        console.log('Error fetching user', error);
      },
    );
};

export const saveUser = async (user: User) => {
  const params = {
    TableName: userTable,
    Key: {
      username: user.username,
    },
    Item: user,
  };

  return await dynamoDB
    .put(params)
    .promise()
    .then(
      (response) => {
        return true;
      },
      (error) => {
        console.log('Error saving user', error);
      },
    );
};
