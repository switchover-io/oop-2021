require('dotenv').config();
import apigateway = require('@aws-cdk/aws-apigateway'); 
import dynamodb = require('@aws-cdk/aws-dynamodb');
import lambda2 = require('@aws-cdk/aws-lambda');
import lambda = require('@aws-cdk/aws-lambda-nodejs');
import cdk = require('@aws-cdk/core');

const SDK_KEY = process.env.SDK_KEY || '';

export class ApiReviewServiceStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    const dynamoTable = new dynamodb.Table(this, 'reviews', {
      partitionKey: {
        name: 'reviewId',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
          name: 'userId',
          type: dynamodb.AttributeType.STRING
      },
      tableName: 'reviews',

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new table, and it will remain in your account until manually deleted. By setting the policy to 
      // DESTROY, cdk destroy will delete the table (even if it has data in it)
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    const getOneLambda = new lambda.NodejsFunction(this, "getOneItemFunction", {
      entry: "src/get-one.ts",
      handler: "handler",
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: "reviewId",
        SORT_KEY: "userId",
        SDK_KEY
      },
    });

    const getOneAggregateLambda = new lambda.NodejsFunction(this, 'getOneAggregateItemFunction', {
      entry: "src/get-one-aggregate.ts",
      handler: 'handler',
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'reviewId',
        SORT_KEY: 'userId',
        SDK_KEY
      }
    });

    const getAllLambda = new lambda.NodejsFunction(this, 'getAllItemsFunction', {
      entry: "src/get-all.ts",
      handler: 'handler',
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'reviewId',
        SDK_KEY
      }
    });

    const createOne = new lambda2.Function(this, 'createItemFunction', {
      code: new lambda2.AssetCode('src'),
      handler: 'create.handler',
      runtime: lambda2.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'reviewId',
        SORT_KEY: 'userId'
      }
    });

    /*

    const updateOne = new lambda.Function(this, 'updateItemFunction', {
      code: new lambda.AssetCode('src'),
      handler: 'update-one.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'itemId'
      }
    });

    const deleteOne = new lambda.Function(this, 'deleteItemFunction', {
      code: new lambda.AssetCode('src'),
      handler: 'delete-one.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
        PRIMARY_KEY: 'itemId'
      }
    }); */
    
    dynamoTable.grantReadWriteData(getAllLambda);
    dynamoTable.grantReadWriteData(getOneLambda);
    dynamoTable.grantReadWriteData(createOne);
    dynamoTable.grantReadWriteData(getOneAggregateLambda);
    //dynamoTable.grantReadWriteData(updateOne);
    //dynamoTable.grantReadWriteData(deleteOne);

    const api = new apigateway.RestApi(this, 'reviewsApi', {
      restApiName: 'Reviews Service'
    });

    const reviews = api.root.addResource('reviews');
    const getAllIntegration = new apigateway.LambdaIntegration(getAllLambda);
    reviews.addMethod('GET', getAllIntegration);

    const createOneIntegration = new apigateway.LambdaIntegration(createOne);
    reviews.addMethod('POST', createOneIntegration);
    
    addCorsOptions(reviews);

    const singleItem = reviews.addResource('{id}');
    const getOneIntegration = new apigateway.LambdaIntegration(getOneLambda);
    singleItem.addMethod('GET', getOneIntegration);

    const aggregateItem = singleItem.addResource('aggregate');
    const getOneAggregateIntegration = new apigateway.LambdaIntegration(getOneAggregateLambda);
    aggregateItem.addMethod('GET', getOneAggregateIntegration);
    addCorsOptions(aggregateItem);
    //const updateOneIntegration = new apigateway.LambdaIntegration(updateOne);
    //singleItem.addMethod('PATCH', updateOneIntegration);

    //const deleteOneIntegration = new apigateway.LambdaIntegration(deleteOne);
    //singleItem.addMethod('DELETE', deleteOneIntegration);
    addCorsOptions(singleItem);
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
new ApiReviewServiceStack(app, 'ApiReviewServiceStack');
app.synth();