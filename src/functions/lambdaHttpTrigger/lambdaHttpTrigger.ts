import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import sendResponse from "src/common/sendResponse";

export const lambdaHttpTrigger = async (
  event: APIGatewayEvent | any
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("======================", event.body);
    return sendResponse(200, "Message sent successfully", {});
  } catch (err) {
    console.log("err: ", err);
  }
};
