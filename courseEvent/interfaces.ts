import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export interface EventInfo {
  eventid: string;
  username: number;
  eventType: EventType;
  courseid: string;
  startTime: Date;
  endTime: Date;
  graded: number;
}

type EventType = ClassType | ExamType | AssignmentType;

enum ClassType {
  lecture,
  tutorial,
  lab,
  seminar,
  workshop,
}
enum ExamType {
  exam,
  practicals,
  takeHomeExam,
  quiz,
  presentation,
}
enum AssignmentType {
  assignment,
  report,
  project,
}

export interface EventParams {
  username: string;
}

export interface MessageBody {
  message: string;
}

export interface GetEventResponseBody {
  events: DynamoDB.DocumentClient.ItemList | undefined | null; // Modify the type here accordingly
}
