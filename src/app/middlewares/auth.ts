import { Request, Response, NextFunction } from 'express'
import jtw from 'jwt-simple'

export default function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body.user) {
        next()
    } else {
        res.send('wrong email or password')
    }
}