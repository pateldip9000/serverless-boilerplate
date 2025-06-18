import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import sendResponse from "src/common/sendResponse";

export const lambdaCronTrigger = async (
  event: APIGatewayEvent | any
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("======================Hello=================");
    return sendResponse(200, "Message sent successfully", {});
  } catch (err) {
    console.log("err: ", err);
  }
};
