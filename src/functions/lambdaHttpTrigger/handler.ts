import { middyfy } from "@libs/lambda";
import { lambdaHttpTrigger } from "./lambdaHttpTrigger";

export const main = middyfy(async (event: any) => {
  return lambdaHttpTrigger(event);
});
