import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/student', studentRoutes);
app.use('/api/teachers', teacherRoutes);


export default app;