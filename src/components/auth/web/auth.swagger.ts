export const authSwaggerDefinitions = {
    LoginRequest: {
      type: "object",
      properties: {
        email: { type: "string", description: "The email for login" },
        password: { type: "string", description: "The user's password" },
      },
      required: ["email", "password"],
    },
    RefreshTokenRequest: {
      type: "object",
      properties: {
        refreshToken: { type: "string", description: "The refresh token to renew the access token" },
      },
      required: ["refreshToken"],
    },
  };
  
  export const authSwaggerPaths = {
    "/v1/auth/login": {
      post: {
        summary: "Login with email and password",
        tags: ["Authentication"],
        requestBody: {
          description: "The user's login credentials",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Unauthorized" },
          400: { description: "Bad Request" },
        },
      },
    },
    "/v1/auth/refresh-token": {
      post: {
        summary: "Refresh the access token using a refresh token",
        tags: ["Authentication"],
        requestBody: {
          description: "The refresh token",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshTokenRequest",
              },
            },
          },
        },
        responses: {
          200: { description: "Access token refreshed successfully" },
          401: { description: "Unauthorized" },
          400: { description: "Bad Request" },
        },
      },
    },
  };
  
  export default {
    openapi: "3.0.0",
    info: {
      title: "Authentication API",
      version: "1.0.0",
      description: "Authentication endpoints for the application",
    },
    paths: authSwaggerPaths,
    components: {
      schemas: authSwaggerDefinitions,
    },
  };
  