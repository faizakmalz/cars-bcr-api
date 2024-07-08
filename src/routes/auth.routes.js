"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/register", auth_middleware_1.optionalAuthenticate, auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post("/login", auth_controller_1.authController.login.bind(auth_controller_1.authController));
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.authController.logout.bind(auth_controller_1.authController));
router.get("/current-user", auth_middleware_1.authenticate, auth_controller_1.authController.getCurrentUser.bind(auth_controller_1.authController));
router.post("/auth/google", auth_controller_1.authController.loginGoogle.bind(auth_controller_1.authController));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});
exports.default = router;
