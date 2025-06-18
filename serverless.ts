import type { AWS } from "@serverless/typescript";
import * as Functions from "@functions/index";

import { ENV } from "src/constants";
import { getQueueEndpoint } from "src/utils";
import { Resources } from "src/resources";

const is_development = ENV.ENVIRONMENT === "Development";

const serverlessConfiguration: AWS = {
  service: ENV.SERVICE_NAME,
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline-sqs",
    "serverless-offline",
    "serverless-dotenv-plugin",
    "serverless-s3-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    profile: "dipAwsServerless",
    region: "us-east-1",
    stage: "dev",
    environment: ENV, // Import all the Environment Variable here
  },
  resources: {
    ...Resources,
  },
  functions: { ...Functions },
  package: {
    individually: true,
  },
  custom: {
    "serverless-offline-sqs": is_development
      ? {
          autoCreate: true,
          endpoint: getQueueEndpoint(ENV.QUEUE_NAME),
          region: "us-east-1",
          accessKeyId: "guest",
          secretAccessKey: "guest",
          skipCacheInvalidation: false,
        }
      : {},
    s3: is_development
      ? {
          port: 4569,
          accessKeyId: "guest",
          secretAccessKey: "guest",
          directory: "/tmp",
        }
      : {},
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node20",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
