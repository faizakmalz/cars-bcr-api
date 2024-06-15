import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate, authorize, optionalAuthenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", optionalAuthenticate, authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/logout", authenticate, authController.logout.bind(authController));
router.get("/current-user", authenticate, authController.getCurrentUser.bind(authController));

export default router;
