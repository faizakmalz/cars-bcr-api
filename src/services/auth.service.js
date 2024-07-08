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
exports.authService = void 0;
const users_repository_1 = require("../repositories/users.repository");
const auth_util_1 = require("../utils/auth.util");
class AuthService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user.password = yield (0, auth_util_1.hashPassword)(user.password);
                const newUser = yield users_repository_1.usersRepository.createUser(user);
                console.log('Insert result:', user, user.password); // Log insert result
                return newUser;
            }
            catch (error) {
                console.error("Error registering user:", error);
                throw new Error("Error registering user");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_repository_1.usersRepository.findUserByEmail(email);
                if (user && (yield (0, auth_util_1.comparePassword)(password, user.password))) {
                    const token = (0, auth_util_1.generateToken)(user);
                    return { user, token };
                }
                else {
                    throw new Error("Invalid email or password");
                }
            }
            catch (error) {
                console.error("Error logging in:", error);
                throw new Error("Error logging in");
            }
        });
    }
    // async loginGoogle(token: String) {
    //   try {
    //     const userData = {
    //     }
    //     const user = await usersRepository.createUser(userData);
    //     const JWTtoken = generateToken(user)
    //   } catch (error) {
    //     console.error("Error logging in:", error);
    //     throw new Error("Error logging in");
    //   }
    // }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_repository_1.usersRepository.findUserById(id);
                return user;
            }
            catch (error) {
                console.error("Error retrieving user:", error);
                throw new Error("Error retrieving user");
            }
        });
    }
}
exports.authService = new AuthService();
