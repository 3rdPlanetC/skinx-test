import expressWinston from 'express-winston'
import winston from 'winston'
const { createLogger, format, transports } = winston

export default class Logger {
    private logger

    constructor() {
        this.logger = createLogger({
            level: "info",
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.simple(),
            ),
        })

        if (process.env.ENV !== 'production') {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple(),
                ),
            }))
        }
    }

    public log(level: string, ...msg: any[]) {
        this.logger.log(level, msg)
    }

    public getRequestLogger() {
        return expressWinston.logger({
            transports: [
                new winston.transports.Console(),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
            meta: process.env.ENV !== 'production',
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
            colorize: true,
            ignoreRoute(req, res) { return false },
        })
    }

    public getRequestErrorLogger() {
        return expressWinston.errorLogger({
            transports: [
                new winston.transports.Console(),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        })
    }
}