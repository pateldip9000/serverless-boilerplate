import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import sendResponse from "src/common/sendResponse";
import {
  ListQueuesCommand,
  SQSClient,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { ENV } from "src/constants";
import { getQueueEndpoint, getQueueUrlByName } from "src/utils";
const is_development = ENV.ENVIRONMENT === "Development";

const sqs = new SQSClient({
  region: ENV.AWS_REGION,
  endpoint: getQueueEndpoint(ENV.QUEUE_NAME),
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY,
    secretAccessKey: ENV.AWS_SECRET_KEY,
  },
});

export const queueSender = async (
  event: APIGatewayEvent | any
): Promise<APIGatewayProxyResult> => {
  const queueUrl = getQueueUrlByName(ENV.QUEUE_NAME);
  console.log("queueUrl", queueUrl);
  const sqsMessage = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(event.body),
  };
  try {
    console.log("======================", sqsMessage);
    const result = await sqs.send(new ListQueuesCommand({}));
    console.log("Available queues:", result.QueueUrls);
    const response = await sqs.send(new SendMessageCommand(sqsMessage));
    console.log("response: ", response);

    return sendResponse(200, "Message sent successfully", {});
  } catch (err) {
    console.log("err: ", err);
  }
  return sendResponse(500, "Error sending message");
};
