import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export interface CourseInfo {
  name: string;
  code: string;
}

export interface MessageBody {
  message: string;
}

export interface GetCourseResponseBody {
  courses: DynamoDB.DocumentClient.ItemList | undefined | null; // Modify the type here accordingly
}
