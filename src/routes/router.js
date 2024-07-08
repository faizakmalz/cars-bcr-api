"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const cars_routes_1 = __importDefault(require("./cars.routes"));
const path_1 = __importDefault(require("path"));
const express_2 = __importDefault(require("express"));
const router = (0, express_1.Router)();
const uploadsDir = path_1.default.join(__dirname, '../uploads');
router.use("/api/v1", auth_routes_1.default);
router.use("/api/v1", cars_routes_1.default);
router.use('/uploads', express_2.default.static(uploadsDir));
exports.default = router;
