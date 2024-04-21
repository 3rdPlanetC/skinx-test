import express, { Express, Request, Response } from "express"
import router from './app/routes/index'
import bodyParser from "body-parser"

const app: Express = express()
app.use(bodyParser.json())
app.use("/", router)

app.get('/healtz', (_: Request, res: Response) => {
    res.send("ok")
})

export default app