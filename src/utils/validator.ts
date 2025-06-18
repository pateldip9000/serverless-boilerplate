import { Handler } from "aws-lambda";
import { Schema, ValidationError } from "joi";

interface MiddlewareHandler {
  before: (handler: HandlerEvent, next: Function) => void;
}

interface HandlerEvent {
  event: {
    body: string;
  };
}

export const bodyValidator = (schema: Schema): MiddlewareHandler => ({
  before: (handler: HandlerEvent, next: Function) => {
    if (!schema) {
      return;
    }
    const { body } = handler.event;
    if (!body) {
      throw new Error("Empty request body!");
    }

    const { error }: { error?: ValidationError } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      throw error;
    }

    // return next();
  },
});
