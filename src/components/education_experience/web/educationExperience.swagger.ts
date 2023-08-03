export const educationExperienceSwaggerDefinitions = {
  EducationExperience: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "The auto-generated ID of the education experience",
      },
      userId: {
        type: "string",
        description: "The user ID the education experience belongs to",
      },
      schoolName: { type: "string", description: "The name of the school" },
      degree: {
        type: "string",
        description: "The degree obtained or being pursued",
      },
      fieldOfStudy: { type: "string", description: "The field of study" },
      startYear: {
        type: "number",
        description: "The year the education started",
      },
      endYear: {
        type: "string",
        description: "The year the education ended or is expected to end",
      },
      grade: { type: "string", description: "The grade obtained" },
      description: {
        type: "string",
        description: "A description of the education experience",
      },
      status: {
        type: "string",
        enum: ["active", "completed", "pending"],
        description: "The status of the education experience",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description:
          "The date and time when the education experience was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description:
          "The date and time when the education experience was last updated",
      },
    },
  },
};

export const educationExperienceSwaggerPaths = {
  "/v1/education-experiences/{userId}": {
    post: {
      summary: "Create a new education experience for a specific user",
      tags: ["Education Experiences"],
      parameters: [
        {
          in: "path",
          name: "userId",
          schema: { type: "string" },
          required: true,
          description: "The user ID",
        },
      ],
      requestBody: {
        description: "The education experience object to create",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EducationExperience",
            },
          },
        },
      },
      responses: {
        201: { description: "Education experience created successfully" },
        400: { description: "Bad Request" },
      },
    },
  },
  "/v1/education-experiences/user/{userId}": {
    get: {
      summary: "Retrieve all education experiences for a specific user",
      tags: ["Education Experiences"],
      parameters: [
        {
          in: "path",
          name: "userId",
          schema: { type: "string" },
          required: true,
          description: "The user ID",
        },
      ],
      responses: {
        200: { description: "A list of education experiences" },
        404: { description: "User not found" },
      },
    },
  },
  "/v1/education-experiences/{id}": {
    get: {
      summary: "Retrieve an education experience by ID",
      tags: ["Education Experiences"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string" },
          required: true,
          description: "The education experience ID",
        },
      ],
      responses: {
        200: { description: "A single education experience" },
        404: { description: "Education experience not found" },
      },
    },
    put: {
      summary: "Update an education experience by ID",
      tags: ["Education Experiences"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string" },
          required: true,
          description: "The education experience ID",
        },
      ],
      requestBody: {
        description: "The education experience object with updated fields",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EducationExperience",
            },
          },
        },
      },
      responses: {
        200: { description: "Education experience updated successfully" },
        400: { description: "Bad Request" },
        404: { description: "Education experience not found" },
      },
    },
    delete: {
      summary: "Delete an education experience by ID",
      tags: ["Education Experiences"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string" },
          required: true,
          description: "The education experience ID",
        },
      ],
      responses: {
        204: { description: "Education experience deleted successfully" },
        400: { description: "Bad Request" },
        404: { description: "Education experience not found" },
      },
    },
  },
  "/v1/education-experiences/autocomplete/{query}": {
    get: {
      summary: "Auto-complete school name based on query",
      tags: ["Education Experiences"],
      parameters: [
        {
          in: "path",
          name: "query",
          schema: { type: "string" },
          required: true,
          description: "The query for auto-completion",
        },
      ],
      responses: {
        200: { description: "A list of matching school names" },
      },
    },
  },
};
