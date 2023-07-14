import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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
        const { httpMethod, resource } = event;
        const requestBody = JSON.parse(event.body!);
        let response;
        switch (true) {
            case httpMethod === 'POST':
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'post',
                    })};
                break;
            case httpMethod === 'GET':
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'get',
                    })};
                break;
            default:
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'none',
                    })};
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
