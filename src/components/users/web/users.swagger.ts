export const usersSwaggerDefinitions = {
  User: {
    type: "object",
    properties: {
      _id: { type: "string", description: "The auto-generated id of the user" },
      email: { type: "string", description: "The email of the user" },
      password: { type: "string", description: "The password of the user" },
      firstName: { type: "string", description: "The first name of the user" },
      lastName: { type: "string", description: "The last name of the user" },
      gender: { type: "string", description: "The gender of the user" },
      phoneNumber: {
        type: "string",
        description: "The phone number of the user",
      },
      role: {
        type: "string",
        enum: ["User", "Admin"],
        description: "The role of the user",
      },
      address: {
        type: "object",
        properties: {
          country: { type: "string", description: "The user's country" },
          stateOrProvince: {
            type: "string",
            description: "The user's state or province",
          },
          city: { type: "string", description: "The user's city" },
          district: { type: "string", description: "The user's district" },
          streetAddress: {
            type: "string",
            description: "The user's street address",
          },
          postalCode: { type: "string", description: "The user's postal code" },
        },
        description: "The address of the user",
      },
      educationExperiences: {
        type: "array",
        items: {
          $ref: "#/components/schemas/EducationExperience",
        },
        description: "The education experiences of the user",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "The date and time when the user was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "The date and time when the user was last updated",
      },
      deleted: {
        type: "boolean",
        description: "The deletion status of the user",
      },
      suspended: {
        type: "boolean",
        description: "The suspension status of the user",
      },
    },
  },
};

export const usersSwaggerPaths = {
  "/v1/users": {
    get: {
      summary: "Retrieve a list of users",
      tags: ["Users"],
      responses: {
        200: {
          description: "A list of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new user",
      tags: ["Users"],
      requestBody: {
        description: "The user object to create",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/v1/users/{id}": {
    get: {
      summary: "Retrieve a user by ID",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
          },
          required: true,
          description: "The user ID",
        },
      ],
      responses: {
        200: {
          description: "A single user",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      summary: "Update a user by ID",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
          },
          required: true,
          description: "The user ID",
        },
      ],
      requestBody: {
        description: "The user object with updated fields",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete a user by ID",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
          },
          required: true,
          description: "The user ID",
        },
      ],
      responses: {
        204: {
          description: "User deleted successfully",
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
