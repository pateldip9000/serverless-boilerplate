import { handlerPath } from "@libs/handler-resolver";
import { ENV } from "src/constants";

export const lambdaS3Trigger = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: ENV.BUCKET_NAME,
        event: "s3:ObjectCreated:*",
        existing: true,
      },
    },
  ],
};
