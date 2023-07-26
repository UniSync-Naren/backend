import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import './helpers/utils/util';
import { buildResponse } from './helpers/utils/util';
import { getCourses } from './functions/getCourses';
import { createCourse } from './functions/CreateCourse';

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
    const { httpMethod } = event;
    const requestBody = JSON.parse(event.body!);
    let response;
    switch (true) {
      case httpMethod === 'GET':
        response = await createCourse(requestBody);
        break;
      case httpMethod === 'POST':
        response = await getCourses(requestBody);
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
