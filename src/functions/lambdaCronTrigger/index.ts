import { handlerPath } from "@libs/handler-resolver";

export const lambdaCronTrigger = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        schedule: "rate(1 minutes)",
      },
    },
  ],
};
