// Load the AWS SDK for Node.js
import { DynamoDB } from 'aws-sdk';
import { CourseInfo, GetCourseResponseBody } from '../interfaces';
import { buildResponse } from '../helpers/utils/util';

// // Set the region
// AWS.config.update({ region: 'us-east-1' });
// Create DynamoDB document client
const dynamoDB = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const courseTable = 'courses';

const getHelper = async (course: CourseInfo) => {
  const params = {
    TableName: courseTable,
    Key: {
      courseid: course.courseid,
    },
  };
  try {
    const response = await dynamoDB.query(params).promise();
    return response.Items;
  } catch (error) {
    console.log('Error fetching courses', error);
    throw error; // Rethrow the error to be caught in the getCourses function
  }
};

export const getCourses = async (course: CourseInfo) => {
  try {
    const courses = await getHelper(course); // Await the Promise here
    const response: GetCourseResponseBody = {
      courses: courses,
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
