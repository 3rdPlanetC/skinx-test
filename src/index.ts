import config from './config'
import * as http from 'http'
import Logger from './lib/logger'
import app from "./app"

const logger: Logger = new Logger()
const port = config.server.port || 8080

const server = http.createServer(app).listen(port)
server.on('listening', async () => {
    logger.log('info', `skinx_test app listening on ${JSON.stringify(server.address())}`)
})

