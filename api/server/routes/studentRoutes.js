import express from 'express';
const router = express.Router();
import {
  getDashboardData,
  getTimetable,
  getGrades,
  getHomework,
  updateHomework
} from '../controllers/studentController.js';

router.get('/dashboard-data', getDashboardData);
router.get('/timetable', getTimetable);
router.get('/grades', getGrades);
router.get('/homework', getHomework);
router.put('/homework/:id', updateHomework);

export default router;