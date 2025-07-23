import Student from '../models/Student.js';
import asyncHandler from 'express-async-handler';

const SAMPLE_STUDENT_ID = 'STU-12345';

const getDashboardData = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID });

  if (student) {
    const now = new Date();
    const pendingHomework = student.homework.filter(hw => !hw.completed && new Date(hw.dueDate) >= now).length;
    const overdueHomework = student.homework.filter(hw => !hw.completed && new Date(hw.dueDate) < now).length;
    const recentGrades = student.grades.slice(-4);

    res.json({
      name: student.name,
      attendancePercentage: student.attendancePercentage,
      homework: { pending: pendingHomework, overdue: overdueHomework },
      recentGrades,
      profilePicture: student.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

const getTimetable = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID }).select('timetable');
  if (student) {
    res.json(student.timetable);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

const getGrades = asyncHandler(async (req, res) => {
    const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID }).select('grades -_id');
     if (student) {
        res.json(student.grades);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

const getHomework = asyncHandler(async (req, res) => {
    const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID }).select('homework');
    if (student) {
        res.json(student.homework);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

const updateHomework = asyncHandler(async (req, res) => {
    const { completed } = req.body;

    const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID });

    if(student) {
        const homework = student.homework.id(req.params.id);
        if (homework) {
            homework.completed = completed;
            await student.save();
            res.json({ message: 'Homework updated' });
        } else {
            res.status(404);
            throw new Error('Homework not found');
        }
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});


export { getDashboardData, getTimetable, getGrades, getHomework, updateHomework };