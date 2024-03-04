import { DynamoDB } from 'aws-sdk';
import { buildResponse } from '../helpers/utils/util';

const dynamoDB = new DynamoDB.DocumentClient();
const eventTable = 'events';

export const deleteEvents = async (eventid: string) => {
  const params = {
    TableName: eventTable,
    Key: {
      id: eventid,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    return buildResponse(200, { message: 'Event deleted successfully' });
  } catch (error) {
    console.log('Error deleting event', error);
    return buildResponse(500, { message: 'Failed to delete event' });
  }
};
