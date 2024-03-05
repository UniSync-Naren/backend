import { DynamoDB } from 'aws-sdk';
import { buildResponse } from '../helpers/utils/util';
import { DeleteEventsProps } from '../interfaces';

const dynamoDB = new DynamoDB.DocumentClient();
const eventTable = 'events';

export const deleteEvents = async (event: DeleteEventsProps) => {
  const params = {
    TableName: eventTable,
    Key: {
      eventid: event.eventid,
      username: event.username,
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
