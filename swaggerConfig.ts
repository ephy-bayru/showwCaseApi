import { authSwaggerDefinitions, authSwaggerPaths } from "./src/components/auth/web/auth.swagger";
import { educationExperienceSwaggerDefinitions, educationExperienceSwaggerPaths } from "./src/components/education_experience/web/educationExperience.swagger";
import { usersSwaggerDefinitions, usersSwaggerPaths } from "./src/components/users/web/users.swagger";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Showwcase API",
      version: "1.0.0",
      description: "API for managing Users and Education Experiences",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      schemas: {
        ...usersSwaggerDefinitions,
        ...educationExperienceSwaggerDefinitions,
        ...authSwaggerDefinitions
      },
    },
    paths: {
      ...usersSwaggerPaths,
      ...educationExperienceSwaggerPaths,
      ...authSwaggerPaths
    },
  },
  apis: [
    "./src/components/health/v1/health.routes.ts",
    "./src/components/users/v1/users.routes.ts",
    "./src/components/educationExperience/v1/educationExperience.routes.ts",
    "./src/components/auth/v1/auth.routes.ts",
  ],
};

export default swaggerOptions;
