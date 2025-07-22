import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';

const SAMPLE_STUDENT_ID = 'STU-12345';

async function seedData() {
    await Student.deleteMany({ studentId: SAMPLE_STUDENT_ID });
    await Student.create({
        studentId: SAMPLE_STUDENT_ID,
        name: 'Alex Doe',
        class: '10th Grade - Section A',
        profilePicture: `https://placehold.co/100x100/3b82f6/FFFFFF?text=AD`,
        attendancePercentage: 92.5,
        homework: [
          { subject: 'Mathematics', task: 'Chapter 5 exercises', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
          { subject: 'History', task: 'Essay on the Renaissance', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
          { subject: 'Science', task: 'Lab Report', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), completed: false },
        ],
        grades: [
            { subject: 'Mathematics', score: 88, term: "Fall 2024" },
            { subject: 'Science', score: 92, term: "Fall 2024" },
            { subject: 'History', score: 78, term: "Fall 2024" },
            { subject: 'English', score: 95, term: "Fall 2024" },
        ],
        timetable: [
            { day: "Monday", period: "09:00 - 10:00", subject: "Mathematics", teacher: "Mr. Smith" },
            { day: "Monday", period: "10:00 - 11:00", subject: "Science", teacher: "Ms. Jones" },
            { day: "Tuesday", period: "09:00 - 10:00", subject: "English", teacher: "Mr. Davis" },
        ]
    });
    console.log("Database seeded with sample student data.");
}

export async function getDashboardData() {
  await dbConnect();
  try {
    let student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID });
    if (!student) {
      await seedData();
      student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID });
    }

    const now = new Date();
    const pendingHomework = student.homework.filter(hw => !hw.completed && new Date(hw.dueDate) >= now).length;
    const overdueHomework = student.homework.filter(hw => !hw.completed && new Date(hw.dueDate) < now).length;
    const recentGrades = student.grades.slice(-4); // Get last 4 grades

    const data = {
      name: student.name,
      attendancePercentage: student.attendancePercentage,
      homework: { pending: pendingHomework, overdue: overdueHomework },
      recentGrades,
      profilePicture: student.profilePicture,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}