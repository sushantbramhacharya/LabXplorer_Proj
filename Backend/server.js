import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Router Imports
import UserRouter from './routes/UserRoute.js'

const app=express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user',UserRouter)

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})