import winston from "winston";
import "winston-daily-rotate-file";
import util from "util";
import dotenv from "dotenv";
//import { TIMEZONE } from "../utils/constants.js";
dotenv.config();

const { format } = winston;

const timezone = () => {
  return new Date().toLocaleString("en-GB", {
    timeZone: process.env.TIMEZONE,
  });
};

const utilFormatter = () => {
  const transform = (info) => {
    const args = info[Symbol.for("splat")];
    if (args) {
      info.message = util.format(info.message, ...args);
    }
    return info;
  };
  return { transform };
};

const wistonTransports = [
  new winston.transports.File({
    filename: "logs/server/error.log",
    level: "error",
    handleExceptions: true,
  }),
  new winston.transports.File({
    filename: "logs/server/all.log",
    level: "info",
    handleExceptions: true,
  }),
  new winston.transports.DailyRotateFile({
    maxFiles: "14d",
    level: "info",
    dirname: "logs/server/daily",
    datePattern: "YYYY-MM-DD",
    filename: "%DATE%.log",
  }),
  new winston.transports.Console({
    level: "debug",
    json: false,
    handleExceptions: true,
  }),
];

/**
 * Logger handles all logs in the product
 */
const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: timezone }),
    utilFormatter(),
    // format.simple()
    format.printf(
      ({ level, message, label, timestamp }) =>
        `⏰ [${timestamp}] ${level}: ${message} | ${label || ""} `
    )
  ),
  colorize: true,
  transports: wistonTransports,
});

const morganTransports = [
  new winston.transports.File({
    filename: "logs/requests/all.log",
    level: "debug",
    handleExceptions: true,
  }),
  new winston.transports.Console({
    level: "debug",
    json: false,
    handleExceptions: true,
  }),
  new winston.transports.DailyRotateFile({
    maxFiles: "14d",
    level: "info",
    dirname: "logs/requests/daily",
    datePattern: "YYYY-MM-DD",
    filename: "%DATE%.log",
  }),
];

/**
 * morganLogger logs all http request in a dedicated file and on console
 */
const morganLogger = winston.createLogger({
  format: format.combine(format.simple()),
  transports: morganTransports,
});

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    if (process.env.NODE_ENV !== "test") {
      morganLogger.info(message.toString());
    }
    if (process.env.NODE_ENV !== "development") {
      morganLogger.info(message.toString());
    }
  },
};

global.logger = logger;
export default logger;
