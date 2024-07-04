import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js'
import { app, server } from './socket/socket.js'

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connecting to database ${error}`);
    }
}

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Listening on port ${PORT}`)
});