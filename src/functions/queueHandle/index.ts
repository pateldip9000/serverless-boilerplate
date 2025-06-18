import { handlerPath } from "@libs/handler-resolver";
import { ENV } from "src/constants";
import { getQueueArnUrlByName } from "src/utils";

export const queueHandle = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  // events: [
  //   {
  //     sqs: {
  //       arn: {
  //         "Fn::GetAtt": ["myQueue", "Arn"],
  //       },
  //       batchSize: 10,
  //     },
  //   },
  // ],
  events: [
    {
      sqs: {
        arn: getQueueArnUrlByName(ENV.QUEUE_NAME),
        batchSize: 5, // Adjust batch size as needed
      },
    },
  ],
};
