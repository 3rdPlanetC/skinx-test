import { PrismaClient } from '@prisma/client'
import Logger from '../../lib/logger'
import { checkUserExistingByUsernameITF } from '../interface/user'

export class UserService {
    private logger: Logger = new Logger()
    private prisma: PrismaClient = new PrismaClient()

    public async checkUserExistingByUsername(username: string): Promise<checkUserExistingByUsernameITF> {
        // check user is exist
        const user_data = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (user_data) {
            this.logger.log('info', ['user already exist'])
            return {
                user_exist: true,
                user_data: user_data
            }
        }
        return {
            user_exist: false,
            user_data: null
        }
    }
}