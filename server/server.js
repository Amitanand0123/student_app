import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/student', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));