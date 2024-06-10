
   import { fileURLToPath } from "url"
//    import path from "path"

   const __filename = fileURLToPath(import.meta.url)
   const __dirname = path.dirname(__filename);



import express from "express"
import cors from "cors"
import cookiePareser from "cookie-parser"
import UserRouter from './routes/user.routes.js'
import path from "path";
import { title } from "process";
import comparisonRouter  from '../src/routes/CompsrisonRoutes.js'

// import router from "./routes/user.routes.js"


im
const app  = express()

app.use(express.static(path.join(__dirname ,'public')));

app.use(cors({

    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookiePareser())


// Set Ejs as the templating engine

app.set('view engine','ejs');
app.set('views',path.join(path.dirname(''),'views'))

//  sample routes 

// app.get('/', (req, res) => {
//     res.render('UTindex.ejs', {
//         title: 'The Universal Truth',
//     });
// });


app.get('/',(req,res) =>{
    res.render('UTindex.ejs', {card:'1',title:'The universal truth'})
})
//   routes declaration

app.use('/api/v1/users', UserRouter)

//  comparison router

app.use('/comparison',comparisonRouter)
// https:// localhost:3000/api/v1/users/register
export {app} 