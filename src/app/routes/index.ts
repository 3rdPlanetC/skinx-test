import { NextFunction, Request, Response, Router } from 'express'
import postRouter from './post'

const router = Router()

router.use('/public/api/v1/post', postRouter)

export default router