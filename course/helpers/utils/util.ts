import { MessageBody, GetCourseResponseBody } from '../../interfaces';

export const buildResponse = (statusCode: number, body: MessageBody | GetCourseResponseBody) => ({
  statusCode: statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});
