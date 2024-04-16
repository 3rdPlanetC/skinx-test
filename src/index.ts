import dotenv from "dotenv"
import config from './config'
import * as http from 'http'
import DatabaseService from "./services/DatabaseService"
import Logger from './lib/logger'
import app from "./app"

const logger: Logger = new Logger()
const port = config.server.port || 8080

dotenv.config()
DatabaseService.getConnection().then(() => {
    const server = http.createServer(app).listen(port);
    server.on('listening', async () => {
        logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
    });
    logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
})

