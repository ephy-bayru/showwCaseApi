import http from "http";
import { createAppInstance } from "./app";
import { IDatabase } from "./repositories/interfaces/IDatabase";
import { MongoDB } from "./repositories/MongoDB";
import { BASE_URL, MONGODB_URI } from "../environment/config";
import logger from "./utils/logger.util";
import seedDatabase from "./middlewares/seedData.middleware";

const port: number = normalizePort(BASE_URL) || 3000;

export async function startServer() {
  const app = setupApp();
  const database = setupDatabase();
  await connectDatabase(database);

  // Uncomment the following line when you want to seed the database
  // await seedDatabase();
    
  startHttpServer(app);
}

function setupApp() {
  const app = createAppInstance();
  app.set("port", port);
  return app;
}

function setupDatabase() {
  const database: IDatabase = new MongoDB(MONGODB_URI);
  return database;
}

async function connectDatabase(database: IDatabase) {
  await database.connect();
}

function startHttpServer(app: any) {
  const server = http.createServer(app);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", () => onListening(server));
}

function normalizePort(val: string | undefined): number | undefined {
  const portNumber = parseInt(val || "", 10);
  if (isNaN(portNumber)) {
    return undefined;
  } else if (portNumber >= 0) {
    return portNumber;
  } else {
    return undefined;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(server: http.Server): void {
  const addr = server.address();
  if (addr) {
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  }
}
