// Load the AWS SDK for Node.js
import { DynamoDB } from 'aws-sdk';
import { EventParams, GetEventResponseBody } from '../interfaces';
import { buildResponse } from '../helpers/utils/util';
import { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';

// // Set the region
// AWS.config.update({ region: 'us-east-1' });
// Create DynamoDB document client
const dynamoDB = new DynamoDB({ apiVersion: '2012-08-10' });
const eventTable = 'events';

const getHelper = async (event: APIGatewayProxyEventQueryStringParameters) => {
  const params = {
    TableName: eventTable,
    ExpressionAttributeValues: {
      ':u': { S: event.username },
    },
    FilterExpression: 'username = :u',
  };
  try {
    const response = await dynamoDB.scan(params).promise();
    return response.Items;
  } catch (error) {
    console.log('Error fetching events', error);
    throw error; // Rethrow the error to be caught in the getCEvents function
  }
};

export const getEvents = async (event: APIGatewayProxyEventQueryStringParameters) => {
  try {
    const events = await getHelper(event);
    const response: GetEventResponseBody = {
      events: events,
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
