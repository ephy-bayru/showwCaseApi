import { Router, Request, Response, NextFunction } from "express";
import SystemInfo from "../../../utils/healthChecks";
import mongoose from "mongoose";
import os from "os";

const router = Router();

const asyncHandler = (fn: Function) => {
  return function (_req: Request, res: Response, next: NextFunction): void {
    Promise.resolve(fn(_req, res, next)).catch(next);
  };
};

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Endpoint for checking the health status of the application.
 */

/**
 * @swagger
 * /v1/health:
 *   get:
 *     summary: Returns the current health status of the application.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: The application is healthy and running properly.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The overall status of the application.
 *                 timestamp:
 *                   type: string
 *                   description: The time at which the status was checked.
 *                 responseTime:
 *                   type: number
 *                   description: The time taken to respond to the request in milliseconds.
 *                 database:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: The status of the connection to the database.
 *                 system:
 *                   type: object
 *                   properties:
 *                     memoryUsage:
 *                       type: object
 *                       description: The current memory usage of the application.
 *                     cpuUsage:
 *                       type: number
 *                       description: The current CPU usage of the application as a percentage.
 *                     uptime:
 *                       type: number
 *                       description: The uptime of the system in seconds.
 *                 environment:
 *                   type: object
 *                   description: The environment variables of the application.
 *       500:
 *         description: The application is not healthy, and there may be issues with its operation.
 */

router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const startTime = new Date();

    const dbStatus = SystemInfo.checkDatabase(mongoose);
    const memoryUsage = SystemInfo.getMemoryUsage();
    const cpuUsage = await SystemInfo.getCpuUsage();
    const uptime = SystemInfo.getUptime(os);
    const envVars = SystemInfo.getEnvVars();

    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();

    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      responseTime: elapsedTime,
      database: { status: dbStatus },
      system: { memoryUsage, cpuUsage, uptime },
      environment: envVars,
    });
  })
);

// router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
//   console.error(err);
//   res.status(500).send("Something went wrong");
// });

export default router;
