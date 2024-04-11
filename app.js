import express from 'express';
import userRouter from './routes/userRoute.js';
import profileRouter from './routes/profileRoute.js';

let app = express();
import db from './config/db.js';
db();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/profile', profileRouter);
export default app;
