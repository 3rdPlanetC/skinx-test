import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    private static userService: UserService = new UserService()

    public static getUserData = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body
        try {
            const user = await UserController.userService.checkUserExistingByUsername(username)
            if (user) {
                res.json({
                    user_data: {
                        id: user.user_data?.id,
                        username: user.user_data?.username
                    }
                })
            } else {
                res.json({})
            }
        } catch (error) {
            res.status(500).json({
                message: 'error from user controller : ' + error
            })
        }
    }
}