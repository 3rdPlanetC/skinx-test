import EventEmitter = require('events')
import { DataSource } from 'typeorm'
import Logger from '../../lib/logger'
import config from '../../config'
import { Post } from '../repository/entities/post.entity'
// import { PostTag } from '../repository/entities/post_tag.entity'
// import { Tag } from '../repository/entities/tag.entity'

export default class DatabaseService {
    public static emitter: EventEmitter = new EventEmitter()
    public static isConnected: Boolean = false
    public static logger: Logger = new Logger()
    private static databaseInstance: DataSource
    public static async getConnection() {
        DatabaseService.handleConnectionError()
        return await DatabaseService.createConnection()
    }
    public static async createConnection() {
        if (!this.databaseInstance) {
            const dataSource = new DataSource({
                type: 'mysql',
                host: config.database.host,
                port: parseInt(config.database.port),
                username: config.database.username,
                password: config.database.password,
                database: config.database.database,
                entities: [Post],
                synchronize: true,
                migrations: ['src/migrations/**/*{.ts,.js}'],
            })
            await dataSource.initialize().then(() => {
                DatabaseService.isConnected = true;
                DatabaseService.logger.log('info', ['database connected successfully']);
            }).catch((err: Error) => {
                DatabaseService.logger.log('error', ['database connection error : ', err]);
                DatabaseService.emitter.emit('DB_CONNECT_ERROR');
            })
            this.databaseInstance = await dataSource
            return this.databaseInstance
        } else {
            return this.databaseInstance
        }
    }
    public static async handleConnectionError() {
        DatabaseService.emitter.on('DB_CONNECT_ERROR', async () => {
            DatabaseService.logger.log('info', ['database connection retrying']);
            setTimeout(async () => {
                await DatabaseService.createConnection();
            }, 3000)
        });
    }
}