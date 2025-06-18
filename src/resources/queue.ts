import { ENV } from "src/constants";

export const queue = {
  [ENV.QUEUE_NAME]: {
    Type: "AWS::SQS::Queue",
    Properties: {
      QueueName: ENV.QUEUE_NAME,
    },
  },
  S3Bucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: ENV.BUCKET_NAME,
    },
  },
};
