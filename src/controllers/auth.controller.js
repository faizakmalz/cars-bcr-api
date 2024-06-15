"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            console.log("Register endpoint hit");
            console.log("Request body:", req.body);
            try {
                if (role === "admin") {
                    if (!req.user || req.user.role !== "superadmin") {
                        return res.status(403).json({ message: "Only superadmin can register an admin" });
                    }
                }
                const user = yield auth_service_1.authService.register({ name, email, password, role });
                console.log('New ID : ', user.id);
                res.status(201).json({ message: "User registered successfully", user: { id: user.id, name: user.name } });
                console.log('New ID : ', user.id);
            }
            catch (error) {
                res.status(500).json({ message: "Error registering user" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const { user, token } = yield auth_service_1.authService.login(email, password);
                res.json({
                    message: "Login successfully",
                    user: { email: user.email, role: user.role },
                    token,
                });
            }
            catch (error) {
                res.status(500).json({ message: "Error logging in" });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ message: "Logout successfully" });
        });
    }
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const user = yield auth_service_1.authService.getUserById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                });
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving user" });
            }
        });
    }
}
exports.authController = new AuthController();
