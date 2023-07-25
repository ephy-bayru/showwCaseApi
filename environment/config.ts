import dotenvSafe from 'dotenv-safe';
import path from 'path';

interface EnvVars {
  [key: string]: string;
}

export class Config {
  private readonly envVars: EnvVars;

  constructor(env: string = process.env.NODE_ENV || 'development') {
    dotenvSafe.config({
      path: path.join(__dirname, `.env.${env}`),
      example: path.join(__dirname, '.env.development'),
    });

    this.envVars = process.env as EnvVars;
  }

  get(varName: string, defaultValue: string = ''): string {
    const value = this.envVars[varName];
    if (!value && !defaultValue) {
      throw new Error(`Environment variable ${varName} is not defined.`);
    }
    return value || defaultValue;
  }
}

const config = new Config();

export const BASE_URL = config.get("BASE_URL");
export const MONGODB_URI = config.get("MONGODB_URI");

export const ACCESS_TOKEN_SECRET = config.get("ACCESS_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRES_IN = config.get("ACCESS_TOKEN_EXPIRES_IN");
export const REFRESH_TOKEN_SECRET = config.get("REFRESH_TOKEN_SECRET");
export const REFRESH_TOKEN_EXPIRES_IN = config.get("REFRESH_TOKEN_EXPIRES_IN");
export const RESET_TOKEN_SECRET = config.get("RESET_TOKEN_SECRET");
export const RESET_TOKEN_EXPIRES_IN = config.get("RESET_TOKEN_EXPIRES_IN");
