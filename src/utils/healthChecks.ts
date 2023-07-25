import mongoose from "mongoose";
import os from "os";

class SystemInfo {
  static checkDatabase(mongooseInstance: typeof mongoose): string {
    return mongooseInstance.connection.readyState === 1
      ? "connected"
      : "disconnected";
  }

  static getMemoryUsage(): NodeJS.MemoryUsage {
    return process.memoryUsage();
  }

  static async getCpuUsage(): Promise<number> {
    return new Promise((resolve) => {
      const startTime = process.cpuUsage();
      setTimeout(() => {
        const endTime = process.cpuUsage(startTime);
        const totalTime = endTime.user + endTime.system;
        const elapsedTime = process.uptime();
        const cpuUsage = (100 * totalTime) / (elapsedTime * os.cpus().length);
        resolve(cpuUsage);
      }, 100);
    });
  }

  static getUptime(osInstance: typeof os): number {
    return osInstance.uptime();
  }

  static getEnvVars(): NodeJS.ProcessEnv {
    return process.env;
  }
}

export default SystemInfo;
