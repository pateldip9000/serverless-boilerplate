import { middyfy } from "@libs/lambda";
import { queueSender } from "./queueSender";

export const main = middyfy(async (event: any) => {
  return queueSender(event);
});
