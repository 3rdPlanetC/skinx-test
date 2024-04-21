import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../../config'

export class AuthMiddleware {
    public static accessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.headers.authorization) {
                return res.sendStatus(401)
            }
            const token = req.headers.authorization.replace("Bearer ", "")
            jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.sendStatus(401)
                } else {
                    next()
                }
            })
        } catch (error) {
            return res.sendStatus(403)
        }
    }

    public static refreshTokenMiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.headers.authorization) {
                return res.sendStatus(401)
            }
            const token = req.headers["authorization"].replace("Bearer ", "")
            jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.sendStatus(401)
                } else {
                    const { username, userId }: any = decoded
                    req.user = {
                        id: userId,
                        username: username,
                        token: token
                    }
                    next()
                }
            })
        } catch (error) {
            return res.sendStatus(403)
        }
    }
}