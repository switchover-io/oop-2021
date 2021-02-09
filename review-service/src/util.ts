import switchover = require('switchover-node-sdk');

const SDK_KEY = process.env.SDK_KEY || '';
const TTL = Number(process.env.TTL || 10);
const swClient = switchover.createClient(SDK_KEY || '', {
  ttl: TTL
});

export function switchoverClient() {
    return swClient;
}

export function addCorsHeaders(existingHeaders?:any) {
    return Object.assign({
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }, existingHeaders);
}

