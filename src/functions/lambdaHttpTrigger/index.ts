import { handlerPath } from "@libs/handler-resolver";

export const lambdaHttpTrigger = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "http-send-data-in-queue",
        cors: true,
      },
    },
  ],
};
