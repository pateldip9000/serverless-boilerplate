type ResponseType = {
  statusCode;
  body;
  headers: {
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Credentials": boolean;
    "content-security-policy": string;
    "Strict-Transport-Security": string;
  };
};

const getMeta = (meta) => (typeof meta !== "undefined" ? { meta } : {});

const formatSuccessResponse = (data, meta) =>
  JSON.stringify({
    success: true,
    data,
    ...getMeta(meta),
    timestamp: new Date().toISOString(),
  });

const formatErrorResponse = (error) =>
  JSON.stringify({
    success: false,
    error,
    timestamp: new Date().toISOString(),
  });

export const sendResponse = (
  statusCode: number,
  body: string | object,
  meta?: Record<string, unknown>
): ResponseType => {
  if (statusCode >= 400) console.log("ERROR =>", body);

  return {
    statusCode: statusCode,
    body:
      statusCode < 400
        ? formatSuccessResponse(body, meta)
        : formatErrorResponse(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "content-security-policy": "frame-ancestors 'self'",
      "Strict-Transport-Security":
        "max-age=63072000; includeSubDomains; preload",
    },
  };
};

export default sendResponse;
