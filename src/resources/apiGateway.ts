import { ENV } from "../constants";

export const apiGateway = {
  // Define the API Gateway REST API
  ApiGatewayRestApi: {
    Type: "AWS::ApiGateway::RestApi",
    Properties: {
      // Set API name dynamically based on service name
      Name: `${ENV.SERVICE_NAME}-api`,
      // Provide a brief API description
      Description: "API for the service",
    },
  },

  // Define the API Gateway Authorizer using Cognito User Pools
  ApiGatewayAuthorizer: {
    Type: "AWS::ApiGateway::Authorizer",
    Properties: {
      // Set TTL for caching authorization results
      AuthorizerResultTtlInSeconds: 0,
      // Define a name for the authorizer
      Name: "project_name_authorization",
      RestApiId: {
        // Reference the API Gateway REST API
        Ref: "ApiGatewayRestApi",
      },
      // Define where to extract the identity from (Authorization header)
      IdentitySource: "method.request.header.Authorization",
      // Specify that Cognito User Pools will be used for authorization
      Type: "COGNITO_USER_POOLS",
      ProviderARNs: [
        {
          // Fetch the ARN of the Cognito User Pool
          "Fn::GetAtt": ["CognitoUserPool", "Arn"],
        },
      ],
    },
  },
};
