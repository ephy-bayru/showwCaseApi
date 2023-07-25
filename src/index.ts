import { startServer } from "./server";
import { createAppInstance } from "./app";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../environment/.env.development') });

const app = createAppInstance();

startServer();
export default app;
