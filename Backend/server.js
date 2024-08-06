import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Router Imports
import UserRouter from './routes/UserRoute.js'
import AdminRouter from './routes/AdminRoute.js'
import CapsuleRouter from './routes/CapsuleRoute.js'

const app=express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true
  }));
//bodyParser
app.use(bodyParser.json());
// Cookie Parser
import cookieParser from "cookie-parser";
app.use(cookieParser());
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Custom Middlewares
import { errorHandler } from './middleware/errorHandler.js';

app.use('/api/user',UserRouter)
app.use('/api/admin',AdminRouter)
app.use('/api/capsule',CapsuleRouter)

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})

