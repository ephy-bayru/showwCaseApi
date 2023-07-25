import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";
import logger from "./utils/logger.util";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../swaggerConfig";
import ResponseHandler from "./helpers/httpResponse.helper";
import { rateLimiter } from "./middlewares/rateLimit.middleware";
import errorMiddleware from "./middlewares/error.middleware";

class AppBuilder {
  private app: Express;

  constructor() {
    this.app = express();
  }

  setupMiddlewares(): AppBuilder {
    this.app.use(rateLimiter);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());

    // Middleware for logging requests
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });

    // Error middleware
    this.app.use(errorMiddleware);

    return this;
  }

  setupSwagger(): AppBuilder {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    return this;
  }

  setupRoutes(): AppBuilder {
    this.app.use("/api", routes);
    this.app.get("/", (req, res) => {
      res.redirect("/api/v1/health");
    });

    // Universal route
    this.app.use((_req: Request, res: Response) => {
      ResponseHandler.send(res, 404, null, "404 Not Found");
    });

    return this;
  }

  build(): Express {
    return this.app;
  }
}

export function createAppInstance(): Express {
  return new AppBuilder()
    .setupMiddlewares()
    .setupSwagger()
    .setupRoutes()
    .build();
}
