import { ENV } from "../constants";

export const cognito = {
  // Define the Cognito User Pool
  CognitoUserPool: {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      // Set user pool name dynamically
      UserPoolName: `${ENV.SERVICE_NAME}-user-pool-dev`,
      AdminCreateUserConfig: {
        // Allow users to sign up themselves
        AllowAdminCreateUserOnly: false,
      },
      // Automatically verify email addresses
      AutoVerifiedAttributes: ["email"],
      // Allow email as a username
      UsernameAttributes: ["email"],
      // Multi-factor authentication (MFA) is optional
      MfaConfiguration: "OPTIONAL",
      // Support multiple MFA methods
      EnabledMfas: ["SOFTWARE_TOKEN_MFA", "EMAIL_OTP", "SMS_MFA"],
      AccountRecoverySetting: {
        RecoveryMechanisms: [
          // Email is the primary recovery method
          { Name: "verified_email", Priority: 1 },
          // Phone number as a fallback
          { Name: "verified_phone_number", Priority: 2 },
        ],
      },
      EmailConfiguration: {
        // Use developer SES account for emails
        EmailSendingAccount: "DEVELOPER",
        // SES ARN for sending emails
        SourceArn: "arn:aws:ses:eu-central-1:xxxxyyyy:identity/xxxyyy.com",
        // Sender email address
        From: "From email",
      },
      SmsConfiguration: {
        // External ID for SNS role
        ExternalId: "cognito-sms-external-id",
        SnsCallerArn: {
          // Reference IAM role for sending SMS
          "Fn::GetAtt": ["CognitoSmsRole", "Arn"],
        },
        SnsRegion: "eu-central-1", // Specify the AWS region for SMS
      },
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8, // Minimum password length requirement
          RequireLowercase: true, // Password must contain lowercase letters
          RequireNumbers: true, // Password must contain numbers
          RequireSymbols: true, // Password must contain special characters
          RequireUppercase: true, // Password must contain uppercase letters
        },
      },
      Schema: [
        {
          AttributeDataType: "String",
          Name: "email",
          // Email is a required attribute
          Required: true,
        },
        {
          AttributeDataType: "String",
          Name: "phone_number",
          // Phone number is optional
          Required: false,
        },
      ],
      // Enable Advanced Security Features
      UserPoolAddOns: {
        AdvancedSecurityMode: "ENFORCED",
      },
    },
  },

  // Define the Cognito User Pool Client
  CognitoUserPoolClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      ClientName: `${ENV.SERVICE_NAME}-user-pool-client-dev`, // Set client name dynamically
      UserPoolId: { Ref: "CognitoUserPool" }, // Reference the created Cognito User Pool
      ExplicitAuthFlows: [
        "ALLOW_USER_SRP_AUTH", // Enable Secure Remote Password (SRP) authentication
        "ALLOW_REFRESH_TOKEN_AUTH", // Allow refresh token authentication
        "ALLOW_USER_PASSWORD_AUTH", // Allow authentication using username and password
      ],
      GenerateSecret: false, // Do not generate a client secret (used for public clients)
    },
  },

  // Define IAM Role for Cognito SMS Authentication
  CognitoSmsRole: {
    Type: "AWS::IAM::Role",
    Properties: {
      // Define the role name
      RoleName: "CognitoSMSRole",
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              // Allow Cognito to assume this role
              Service: "cognito-idp.amazonaws.com",
            },
            Action: "sts:AssumeRole",
            Condition: {
              StringEquals: {
                // Ensure external ID matches
                "sts:ExternalId": "cognito-sms-external-id",
              },
            },
          },
        ],
      },
      Policies: [
        {
          PolicyName: "CognitoSMSPolicy",
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                // Allow publishing messages to SNS
                Action: ["sns:Publish"],
                // Grant permission to all SNS topics
                Resource: "*",
              },
            ],
          },
        },
      ],
    },
  },
};
