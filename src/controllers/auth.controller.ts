import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import 'google-auth-library'
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/auth.util";


class AuthController {

  async register(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    console.log("Register endpoint hit");
    console.log("Request body:", req.body);

    try {
      if (role === "admin") {
        if (!req.user || req.user.role !== "superadmin") {
          return res.status(403).json({ message: "Only superadmin can register an admin" });
        }
      }

      const user = await authService.register({ name, email, password, role });
      console.log('New ID : ', user.id  )
      res.status(201).json({ message: "User registered successfully", user: { id: user.id , name: user.name } });
      console.log('New ID : ', user.id  )
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await authService.login(email, password);
      res.json({
        message: "Login successfully",
        user: { email: user.email, role: user.role },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  }

  async loginGoogle(req: Request, res: Response) {
    const client = new OAuth2Client('1020414211454-vhqkl708cateej0qsl84knc1ok6kslr7.apps.googleusercontent.com')

    try {
      const {token} = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '1020414211454-vhqkl708cateej0qsl84knc1ok6kslr7.apps.googleusercontent.com'
      })

      const response: any = ticket.getPayload()

      console.log(response)
      
      const payload = {
        id: response.sub,
        role: 'user'
      }

      
      
      const JWTtoken = generateToken(payload);

      res.status(201).json({
        message: "Login successfully",
        token: JWTtoken,
      });

      return JWTtoken;

      // const { user, token } = await authService.login(email, password);
      // res.json({
      //   message: "Login successfully",
      //   user: { email: user.email, role: user.role },
      //   token,
      // });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  }

  async logout(req: Request, res: Response) {
    res.json({ message: "Logout successfully" });
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const user = await authService.getUserById(userId);
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
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user" });
    }
  }
}

export const authController = new AuthController();
