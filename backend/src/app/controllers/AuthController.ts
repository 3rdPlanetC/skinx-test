import { Request, Response, NextFunction } from 'express'
import { AuthService } from "../services/AuthService"
import { UserService } from "../services/UserService"

export class AuthController {
    private static authService: AuthService = new AuthService()
    private static userService: UserService = new UserService()

    public static async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body
        try {
            const { user_exist, user_data } = await AuthController.userService.checkUserExistingByUsername(username)
            if (!user_exist) {
                res.status(401).json({
                    message: 'wrong username'
                })
            }
            if (user_data) {
                const { accessToken, refresh_token } = await AuthController.authService.loginUser(user_data, password)
                res.status(200).json({
                    access_token: accessToken,
                    refresh_token: refresh_token,
                    user_data: {
                        id: user_data.id,
                        username: user_data.username
                    }
                })
            }
        } catch (error: any) {
            res.status(401).json({
                message: error.message,
                status: 401
            })
        }
    }

    public static async register(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body
        try {
            const { user_exist } = await AuthController.userService.checkUserExistingByUsername(username)
            if (user_exist) {
                res.status(400).json({
                    message: 'user already exist'
                })
            } else {
                const userCreate = await AuthController.authService.registerUser(username, password)
                res.status(200).json({
                    message: 'register successfully',
                    user_data: userCreate
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from auth controller : ' + error
            })
        }
    }

    public static async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.user
            const { user_exist, user_data } = await AuthController.userService.checkUserExistingByUsername(username)
            if (!user_exist) {
                res.status(400).json({
                    message: 'wrong username'
                })
            }
            if (user_data) {
                const { accessToken, refresh_token } = await AuthController.authService.setAuthToken(user_data)
                res.status(200).json({
                    access_token: accessToken,
                    refresh_token: refresh_token,
                    user_data: {
                        id: user_data.id,
                        username: user_data.username
                    }
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from auth controller : ' + error
            })
        }
    }
}