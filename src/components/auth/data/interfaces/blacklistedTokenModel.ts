import { model } from "mongoose";
import { blacklistedTokenSchema } from "../schemas/blacklistedTokenModel";

export const BlacklistedTokenModel = model(
  "BlacklistedToken",
  blacklistedTokenSchema
);
