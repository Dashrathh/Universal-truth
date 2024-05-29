import express from "express"
import cors from "cors"
import cookiePareser from "cookie-parser"
import UserRouter from './routes/user.routes.js'
// import router from "./routes/user.routes.js"

const app  = express()

app.use(cors({

    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookiePareser())


//   routes declaration

app.use('/api/v1/users', UserRouter)

// https:// localhost:3000/api/v1/users/register
export {app} 