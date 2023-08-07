import express from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "../middlewares/authenticate";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", authController.login.bind(authController));
// router.post("/logout", authController.logout.bind(authController));

authRouter.post(
  "/refresh-token",
  authenticate,
  authController.refreshToken.bind(authController)
);

export default authRouter;
