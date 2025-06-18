const { ValidationError } = require("joi");

export const errorHandler = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof ValidationError) {
      handler.response = {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          data: null,
          error: handler?.error?.details,
        }),
      };
    } else {
      handler.response = {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          data: null,
          error: "Internal Server Error",
        }),
      };
    }

    // next();
  },
});
