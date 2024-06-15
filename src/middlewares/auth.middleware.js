"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.optionalAuthenticate = exports.authenticate = void 0;
const auth_util_1 = require("../utils/auth.util");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decoded = (0, auth_util_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("Invalid token", error);
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authenticate = authenticate;
const optionalAuthenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (token) {
        try {
            const decoded = (0, auth_util_1.verifyToken)(token);
            req.user = decoded;
        }
        catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }
    }
    next();
};
exports.optionalAuthenticate = optionalAuthenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};
exports.authorize = authorize;
