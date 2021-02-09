import { addCorsHeaders, switchoverClient } from "./util";

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';


const swClient = switchoverClient();
export const handler = async () : Promise <any> => {

  const params = {
    TableName: TABLE_NAME
  };

  await swClient.fetchAsync();
  if (swClient.toggleValue('review-killswitch', false)) {
    return { statusCode: 200, headers: addCorsHeaders(),  body: JSON.stringify([]) };
  }

  try {
    const response = await db.scan(params).promise();
    return { statusCode: 200, headers: addCorsHeaders(),  body: JSON.stringify(response.Items) };
  } catch (dbError) {
    return { statusCode: 500, headers: addCorsHeaders(), body: JSON.stringify(dbError)};
  }
};