import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import sendResponse from "src/common/sendResponse";
import { ENV } from "src/constants";
import { getS3Endpoint, streamToString } from "src/utils";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const is_development = ENV.ENVIRONMENT === "Development";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: is_development ? "S3RVER" : ENV.AWS_ACCESS_KEY, // Use the same dummy credentials as your local S3
    secretAccessKey: is_development ? "S3RVER" : ENV.AWS_SECRET_KEY,
  },
  endpoint: getS3Endpoint(), // Ensure this matches your local S3 endpoint
  region: ENV.AWS_REGION,
  forcePathStyle: true, // Needed for local S3
});

export const lambdaS3Trigger = async (
  event: APIGatewayEvent | any
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("S3 Event:", JSON.stringify(event, null, 2));
    for (const record of event.Records) {
      const bucket = record.s3.bucket.name;
      const key = record.s3.object.key;
      try {
        const params = {
          Bucket: bucket,
          Key: key,
        };
        console.log("params", params);
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const fileContent = await streamToString(data.Body as Readable);
        console.log("File Content:", fileContent);
        // Perform further processing on the file content if needed
      } catch (error) {
        console.error("Error reading S3 object:", error);
      }
    }
    console.log("======================");
    return sendResponse(200, "Message sent successfully", {});
  } catch (err) {
    console.log("err: ", err);
  }
};
