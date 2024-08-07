"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./src/database/index");
const router_1 = __importDefault(require("./src/routes/router"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
const app = (0, express_1.default)();
const PORT = process.env.DB_PORT;
const pw = process.env.DB_PASSWORD;
console.log('first', pw);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(router_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
