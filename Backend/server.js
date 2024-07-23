import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Router Imports
import UserRouter from './routes/UserRoute.js'

const app=express();
const port = 3000;

app.use(cors());
//bodyParser
app.use(bodyParser.json());
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Custom Middlewares
import { errorHandler } from './middleware/errorHandler.js';

app.use('/api/user',UserRouter)

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})

