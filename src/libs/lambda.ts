import { signInSchema } from "@functions/signIn/schema";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "src/utils/errorHandler";
import { bodyValidator } from "src/utils/validator";

/**
 * A utility function to wrap a Lambda handler with Middy middleware.
 * This function adds JSON body parsing middleware to the handler.
 *
 * @param handler - The Lambda handler function to be wrapped.
 * @returns A Middy-wrapped handler with JSON body parsing middleware.
 */
export const middyfy = (handler, schema?) => {
  // Wrap the handler with Middy and add JSON body parsing middleware
  return (
    middy(handler)
      .use(middyJsonBodyParser())
      //@ts-ignore
      .use(bodyValidator(schema))
      //@ts-ignore
      .use(errorHandler())
  );
};
