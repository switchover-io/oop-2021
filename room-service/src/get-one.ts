//const AWS = require('aws-sdk');

import rooms from './rooms';
import { addCorsHeaders } from './util';

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedRoomId = event.pathParameters.id;
  if (!requestedRoomId) {
    return { statusCode: 400, 
      body: `Error: You are missing the path parameter id` };
  }

  try {
    const response = rooms.find( (item) => item.id === requestedRoomId );
    return { statusCode: 200, headers: addCorsHeaders(), body: JSON.stringify(response) };
  } catch (dbError) {
    return { statusCode: 500, headers: addCorsHeaders(), body: JSON.stringify(dbError) };
  }
};