import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import cookieParser from 'cookie-parser';

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connecting to database ${error}`);
    }
}

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Listening on port ${PORT}`)
});