
import { DynamoDB } from '../__mocks__/aws-sdk';
const switchover = require('../__mocks__/switchover-node-sdk');

import { handler } from '../src/get-all';

const db = new DynamoDB.DocumentClient();

const client = switchover.createClient();

test("bla", async ()=> {
  
    const { body } = await handler();

   // expect(db.scan).toHaveBeenCalledTimes(1);
    expect(JSON.parse(body)).toHaveLength(0)
    expect(client.toggleValue).toHaveBeenCalledTimes(1);
    expect(client.toggleValue("killswitch")).toBeTruthy();
})