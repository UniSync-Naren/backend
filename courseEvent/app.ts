import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const eventPath = '/event';

import './helpers/utils/util';
import { buildResponse } from './helpers/utils/util';
import { getEvents } from './functions/getEvents';
import { createEvents } from './functions/createEvents';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(' Request Event : ', event);
    const { httpMethod, path } = event;
    const requestBody = JSON.parse(event.body!);
    const queryParams = event.queryStringParameters!;
    // Combine the parameters into an object
    let response;
    switch (true) {
      case httpMethod === 'POST' && path === eventPath:
        response = await createEvents(requestBody);
        break;
      case httpMethod === 'GET' && path === eventPath:
        response = await getEvents(queryParams);
        break;
      default:
        response = buildResponse(404, { message: 'Error, Path Not Found' });
    }
    return response;
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};
