import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../swaggerConfig";

export function createAppInstance(): Express {
  const app = express();

  setupMiddlewares(app);
  setupSwagger(app);

  return app;
}

function setupMiddlewares(app: Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(helmet());
}

function setupSwagger(app: Express) {
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
