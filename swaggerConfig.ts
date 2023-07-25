const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Showwcase API",
        version: "1.0.0",
        description: "API for managing Users experiance",
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
      components: {
        schemas: {
        },
      },
      paths: {
      },
    },
    apis: [
    ],
};

export default swaggerOptions;
