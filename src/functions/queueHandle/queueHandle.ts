import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import sendResponse from "src/common/sendResponse";

export const queueHandle = async (
  event: APIGatewayEvent | any
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("***********************************", event);
    return sendResponse(200, "Hello", {});
  } catch (err) {
    return sendResponse(200, "Error", err);
  }
};
