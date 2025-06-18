import { ENV } from "src/constants";
import { Readable } from "stream";

const is_development = ENV.ENVIRONMENT === "Development";

export const getQueueUrlByName = (queueName: string) => {
  return is_development
    ? `http://localhost:9324/queue/${queueName}`
    : `https://sqs.${ENV.AWS_REGION}.amazonaws.com/${ENV.AWS_PORTAL_ID}/${queueName}`;
};

export const getQueueArnUrlByName = (queueName: string) => {
  return is_development
    ? `arn:aws:sqs:elasticmq:000000000000:${queueName}`
    : `arn:aws:sqs:${ENV.AWS_REGION}:${ENV.AWS_PORTAL_ID}:${queueName}`;
};

export const getQueueEndpoint = (queueName: string) => {
  return is_development
    ? "http://localhost:9324"
    : `https://sqs.${ENV.AWS_REGION}.amazonaws.com/${ENV.AWS_PORTAL_ID}/${queueName}`;
};

export const getS3Endpoint = () => {
  return is_development ? "http://localhost:4569" : "https://s3.amazonaws.com";
};

export const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

export const generateUsernameFromEmail = (email: string) => {
  return email.match(/^([^@]*)@/)[1];
};
