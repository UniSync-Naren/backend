// Load the AWS SDK for Node.js
import { DynamoDB } from 'aws-sdk';
import { EventInfo } from '../interfaces';
import { buildResponse } from '../helpers/utils/util';

// // Set the region
// AWS.config.update({ region: 'us-east-1' });
// Create DynamoDB document client
const dynamoDB = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const eventTable = 'events';

const createHelper = async (event: EventInfo) => {
  const params = {
    TableName: eventTable,
    Key: {
      eventid: event.eventid,
      username: event.username,
    },
    Item: event,
  };

  return await dynamoDB
    .put(params)
    .promise()
    .then(
      (response) => {
        return true;
      },
      (error) => {
        console.log('Error creating event', error);
      },
    );
};

export const createEvent = async (event: EventInfo) => {
  try {
    await createHelper(event);
    const response = {
      message: 'event created',
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
