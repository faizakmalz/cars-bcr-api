"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./src/database/index");
const router_1 = __importDefault(require("./src/routes/router"));
const app = (0, express_1.default)();
const PORT = 3002;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
