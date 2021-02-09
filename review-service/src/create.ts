import { addCorsHeaders } from "./util";

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';
const SORT_KEY = process.env.SORT_KEY || '';

const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
  DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;

export const handler = async (event: any = {}) : Promise <any> => {

  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }
  const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);

  const params = {
    TableName: TABLE_NAME,
    Item: {
        [PRIMARY_KEY] : item.reviewId,
        [SORT_KEY] : item.userId,
        rating : item.rating,
        comment : item.comment
    }
  };

  try {
    await db.put(params).promise();
    return { statusCode: 201, headers: addCorsHeaders(), body: '' };
  } catch (dbError) {
    const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
    DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
    return { statusCode: 500, headers: addCorsHeaders(),  body: errorResponse };
  }
};