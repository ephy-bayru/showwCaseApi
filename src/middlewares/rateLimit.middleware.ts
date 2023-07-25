import rateLimit, { Options } from "express-rate-limit";

export function createRateLimiter(options: Partial<Options>) {
  return rateLimit(options);
}

export const rateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

export const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: "Too many login attempts from this IP, please try again after 15 minutes.",
});
