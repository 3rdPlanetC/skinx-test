import dotenv from "dotenv"

dotenv.config()

declare module "express-serve-static-core" {
    interface Request {
        user: {
            id: any,
            username: any
            token: string
        }
    }
}

export const PORT = process.env.PORT || 8080
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET"
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET"