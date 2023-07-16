import { MessageBody, LoginResponseBody, RegisterResponseBody } from '../../interfaces';

export const buildResponse = (statusCode: number, body: MessageBody | LoginResponseBody | RegisterResponseBody) => ({
  statusCode: statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});
