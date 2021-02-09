import apigateway = require('@aws-cdk/aws-apigateway'); 
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');

export class ApiRoomServiceStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);


    const getOneLambda = new lambda.Function(this, 'getOneRoomFunction', {
      code: new lambda.AssetCode('src'),
      handler: 'get-one.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const getAllLambda = new lambda.Function(this, 'getAllRoomsFunction', {
      code: new lambda.AssetCode('src'),
      handler: 'get-all.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });


    const api = new apigateway.RestApi(this, 'roomsApi', {
      restApiName: 'Rooms Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      },
      
    });

    const rooms = api.root.addResource('rooms');
    const getAllIntegration = new apigateway.LambdaIntegration(getAllLambda);
    rooms.addMethod('GET', getAllIntegration);

    //addCorsOptions(rooms);

    const singleItem = rooms.addResource('{id}');
    const getOneIntegration = new apigateway.LambdaIntegration(getOneLambda);
    singleItem.addMethod('GET', getOneIntegration);

    //addCorsOptions(singleItem);
  }
}

export function addCorsOptions(apiResource: apigateway.IResource) {
  apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },  
    }]
  })
}

const app = new cdk.App();
new ApiRoomServiceStack(app, 'ApiRoomServiceStack');
app.synth();
