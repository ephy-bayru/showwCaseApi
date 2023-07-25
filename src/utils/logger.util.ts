import winston, { format } from "winston";

const customFormat = format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        customFormat
      ),
    }),
    new winston.transports.File({
      filename: "logs/showwCase-Api-error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/showwCase-Api-combined.log",
    }),
  ],
});

export default logger;
