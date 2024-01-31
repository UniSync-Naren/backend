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
    Item: event,
  };

  return await dynamoDB
    .put(params)
    .promise()
    .then(
      () => {
        return true;
      },
      (error) => {
        console.log('Error creating event', error);
        throw error; // Rethrow the error to be caught in the calling function
      },
    );
};

export const createEvents = async (events: EventInfo[]) => {
  console.log('events: ', events, 'length: ', events.length);
  for (let i = 0; i < events.length; i = i + 1) {
    console.log('event: ', events[i], 'i: ', i);
    try {
      await createHelper(events[i]);
    } catch (err) {
      // Handle errors thrown by the inner functions
      const error = err as Error; // Type assertion

      const response = {
        message: error.message,
      };
      return buildResponse(200, response);
    }
  }

  return buildResponse(200, 'events created');
};
