// Load the AWS SDK for Node.js
import { DynamoDB } from 'aws-sdk';
import { CourseInfo } from '../interfaces';
import { buildResponse } from '../helpers/utils/util';

// // Set the region
// AWS.config.update({ region: 'us-east-1' });
// Create DynamoDB document client
const dynamoDB = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const courseTable = 'courses';

const createHelper = async (course: CourseInfo) => {
  const params = {
    TableName: courseTable,
    Key: {
      code: course.code,
    },
    Item: course,
  };

  return await dynamoDB
    .put(params)
    .promise()
    .then(
      (response) => {
        return true;
      },
      (error) => {
        console.log('Error creating course', error);
      },
    );
};

export const createCourse = async (course: CourseInfo) => {
  try {
    await createHelper(course);
    const response = {
      message: 'course created',
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
