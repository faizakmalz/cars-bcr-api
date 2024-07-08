import { usersRepository } from "../repositories/users.repository";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.util";

class AuthService {
  async register(user: any) {
    try {
      user.password = await hashPassword(user.password);
      const newUser = await usersRepository.createUser(user);
      console.log('Insert result:', user, user.password); // Log insert result

      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Error registering user");
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await usersRepository.findUserByEmail(email);
      if (user && (await comparePassword(password, user.password))) {
        const token = generateToken(user);
        return { user, token };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Error logging in");
    }
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

  async getUserById(id: string) {
    try {
      const user = await usersRepository.findUserById(id);
      return user;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw new Error("Error retrieving user");
    }
  }
}

export const authService = new AuthService();
