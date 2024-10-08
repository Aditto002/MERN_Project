import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Userrouter from './routes/user.route.js';
import Authrouter from './routes/auth.route.js';
import Galleryrout from './routes/gallery.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
 

app.listen(5000,()=>{
    console.log("server is runing on port 5000");
});


app.use('/api/image/',Galleryrout)
app.use('/api/user/',Userrouter)
app.use('/api/auth/', Authrouter)



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})