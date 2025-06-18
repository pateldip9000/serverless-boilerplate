import { handlerPath } from "@libs/handler-resolver";

export const queueSender = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "send-data-in-queue",
        cors: true,
      },
    },
  ],
};
