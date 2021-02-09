import { addCorsHeaders, switchoverClient } from "./util";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "reviews";
const PRIMARY_KEY = process.env.PRIMARY_KEY || "reviewId";

const swClient = switchoverClient();
export const handler = async (event: any = {}): Promise<any> => {
  const requestedItemId = event.pathParameters.id;
  if (!requestedItemId) {
    return {
      statusCode: 400,
      body: `Error: You are missing the path parameter id`,
    };
  }

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "#pk = :val",
    ExpressionAttributeNames: {
      "#pk": PRIMARY_KEY,
    },
    ExpressionAttributeValues: {
      ":val": requestedItemId,
    },
  };

  await swClient.fetchAsync();
  if (swClient.toggleValue('review-killswitch', false)) {
    return { statusCode: 200, headers: addCorsHeaders(),  body: JSON.stringify(dummyResponse()) };
  }

  try {
    const result = await db.query(params).promise();

    const ratingSum = result.Items.reduce(
      (acc: any, value: any) => (acc += value.rating),
      0
    );

    const response = {
      reviews: result.Count,
      ratingAvg: (ratingSum > 0 ? ratingSum / result.Count : 0).toFixed(),
    };

    return { statusCode: 200, headers: addCorsHeaders(), body: JSON.stringify(response) };
  } catch (dbError) {
    return { statusCode: 500, headers: addCorsHeaders(), body: JSON.stringify(dbError) };
  }
};

const dummyResponse = () => {
  return {
    reviews: 0,
    ratingAvg: 0
  };
}