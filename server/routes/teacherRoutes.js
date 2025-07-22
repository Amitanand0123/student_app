import express from 'express';
const router = express.Router();
import { contactTeacher } from '../controllers/teacherController.js';

router.post('/contact', contactTeacher);

export default router;