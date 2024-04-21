import { PrismaClient, User } from '@prisma/client'
import Logger from '../../lib/logger'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config'
import { UserITF } from '../interface/user'

export class AuthService {
    private logger: Logger = new Logger()
    private prisma: PrismaClient = new PrismaClient()

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt()
        return bcrypt.hashSync(password, salt)
    }

    private setAccessToken(user_data: UserITF) {
        const accessToken = jwt.sign({
            username: user_data.username,
            userId: user_data.id
        }, ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
            algorithm: "HS256"
        })
        return accessToken
    }

    private setrefresh_token(user_data: UserITF) {
        const accessToken = jwt.sign({
            username: user_data.username,
            userId: user_data.id
        }, REFRESH_TOKEN_SECRET, {
            expiresIn: "1d",
            algorithm: "HS256"
        })
        return accessToken
    }

    public setAuthToken(user_data: UserITF) {
        const accessToken = this.setAccessToken(user_data)
        const refresh_token = this.setrefresh_token(user_data)
        return {
            accessToken,
            refresh_token
        }
    }

    public async registerUser(username: string, password: string) {
        try {
            const encryptPassword = await this.hashPassword(password)
            const userCreated = await this.prisma.user.create({
                data: {
                    username: username,
                    password: encryptPassword
                }
            })
            return userCreated
        } catch (error) {
            this.logger.log('error', ['error from AuthService:registerUser() -> ', error])
            throw new Error(`error from AuthService:registerUser() -> ${error}`)
        }
    }

    public async loginUser(user_data: UserITF, password: string): Promise<{ accessToken: string, refresh_token: string, user_data: UserITF }> {
        try {
            const isMatch = await bcrypt.compare(password, user_data.password)
            if (!isMatch) {
                this.logger.log('error', ['wrong password'])
                throw new Error('wrong password')
            }
            const { accessToken, refresh_token } = this.setAuthToken(user_data)
            this.logger.log('info', ['token updated'])
            return { accessToken, refresh_token, user_data }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}