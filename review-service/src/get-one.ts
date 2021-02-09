import { addCorsHeaders, switchoverClient } from "./util";

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || 'reviews';
const PRIMARY_KEY = process.env.PRIMARY_KEY || 'reviewId';

const swClient = switchoverClient();

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.id;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "#pk = :val",
        ExpressionAttributeNames:{
            "#pk": PRIMARY_KEY
        },
        ExpressionAttributeValues: {
            ":val": requestedItemId
        }
  };

  
  await swClient.fetchAsync();

  if (swClient.toggleValue('review-killswitch', false)) {
    return { statusCode: 200, headers: addCorsHeaders(),  body: JSON.stringify([]) };
  }
  
  try {
    const response = await db.query(params).promise();
    return { statusCode: 200, headers: addCorsHeaders(),  body: JSON.stringify(response.Items) };
  } catch (dbError) {
    return { statusCode: 500, headers: addCorsHeaders(), body: JSON.stringify(dbError) };
  }
};