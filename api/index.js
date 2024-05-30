import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.model.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import uploadRouter from './routes/upload.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

console.log('Connecting to MongoDB:', process.env.MONGO);
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to database');

        Listing.init().then(() => {
            console.log('Indexes ensured for Listing model');
        }).catch((error) => {
            console.error('Error ensuring indexes:', error);
        });

    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/upload", uploadRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error('Error:', {
        message,
        stack: err.stack,
    });
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
