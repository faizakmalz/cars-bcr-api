import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate, authorize, optionalAuthenticate } from "../middlewares/auth.middleware";
import passport from "passport";

const router = Router();

router.post("/register", optionalAuthenticate, authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/logout", authenticate, authController.logout.bind(authController));
router.get("/current-user", authenticate, authController.getCurrentUser.bind(authController));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

export default router;
