import { middyfy } from "@libs/lambda";
import { lambdaCronTrigger } from "./lambdaCronTrigger";

export const main = middyfy(async (event: any) => {
  return lambdaCronTrigger(event);
});
