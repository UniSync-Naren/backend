import { DynamoDB } from 'aws-sdk';
import { EventInfo, RestEventInfo } from '../interfaces';
import { buildResponse } from '../helpers/utils/util';

const dynamoDB = new DynamoDB.DocumentClient();
const eventTable = 'events';

export const editEvents = async (event: EventInfo) => {
  const { eventid, ...rest } = event; // Destructure the event to separate the ID from the rest of the attributes.
  const params = {
    TableName: eventTable,
    Key: {
      eventid,
    },
    UpdateExpression:
      'set ' +
      Object.keys(rest)
        .map((key, index) => `#${key} = :value${index}`)
        .join(', '),
    ExpressionAttributeNames: Object.keys(rest).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {}),
    ExpressionAttributeValues: Object.keys(rest).reduce(
      (acc, key, index) => ({ ...acc, [`:value${index}`]: rest[key as keyof RestEventInfo] }),
      {},
    ),
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    await dynamoDB.update(params).promise();
    return buildResponse(200, { message: 'Event updated successfully' });
  } catch (error) {
    console.log('Error updating event', error);
    return buildResponse(500, { message: 'Failed to update event' });
  }
};
