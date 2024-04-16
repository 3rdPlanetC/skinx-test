import EventEmitter = require('events')
import { createConnection } from 'typeorm'
import Logger from '../lib/logger'
import config from '../config'
import { Post } from '../entities/post.entity'

export default class DatabaseService {
    public static emitter: EventEmitter = new EventEmitter()
    public static isConnected: Boolean = false
    public static logger: Logger = new Logger()
    public static async getConnection() {
        DatabaseService.handleConnectionError();
        return await DatabaseService.createConnection();
    }
    public static async createConnection() {
        // const dbConfig = config.database
        return await createConnection({
            name: "typeormConnection",
            type: 'mysql',
            host: "mysql",
            port: 3306,
            username: "root",
            password: "root",
            database: "mysql"
            // entities: [
            //     Post,
            // ]
        }).then(() => {
            DatabaseService.isConnected = true;
            DatabaseService.logger.log('info', 'database connected successfully');
        }).catch((err: Error) => {
            DatabaseService.logger.log('error', 'database connection error : ', err);
            DatabaseService.emitter.emit('DB_CONNECT_ERROR');
        });
    }
    public static async handleConnectionError() {
        DatabaseService.emitter.on('DB_CONNECT_ERROR', async () => {
            DatabaseService.logger.log("hello world error")
            DatabaseService.logger.log('info', 'database connection retrying');
            setTimeout(async () => {
                await DatabaseService.createConnection();
            }, 3000)
        });
    }
}