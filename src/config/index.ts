import dotenv from "dotenv"

dotenv.config()

export interface IDatabase {
    database: string,
    dialect: string,
    host: string,
    password: string,
    port: string,
    username: string,
}

export default {
    // database
    database: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT
    },
    // server
    server: {
        port: process.env.PORT
    }
}