//const AWS = require('aws-sdk');

import rooms from './rooms';
import { addCorsHeaders } from './util';

export const handler = async () : Promise <any> => {

    return { statusCode: 200, 
        headers: addCorsHeaders(), 
        body: JSON.stringify(rooms) };

};