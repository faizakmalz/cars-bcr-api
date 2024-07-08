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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("../services/auth.service");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '1020414211454-vhqkl708cateej0qsl84knc1ok6kslr7.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://resulting-roby-synrgy7-faza-1307d6b4.koyeb.app/api/v1/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Save user to database here
    const user = {
        id: profile.id,
        email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a.values,
        name: profile.displayName,
        role: 'customer'
    };
    // Save the user to your database
    yield auth_service_1.authService.register(user);
    done(null, profile);
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
