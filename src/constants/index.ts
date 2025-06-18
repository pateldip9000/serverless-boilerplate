import * as env from "dotenv";
env.config();
export const ENV = {
  SERVICE_NAME: process.env.SERVICE_NAME,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_PORTAL_ID: process.env.AWS_PORTAL_ID,
  QUEUE_NAME: process.env.QUEUE_NAME,
  BUCKET_NAME: process.env.BUCKET_NAME,
  ENVIRONMENT: process.env.ENVIRONMENT,
  COGNITO_CLIENTID: process.env.COGNITO_CLIENTID,
}; // import all the environment here
