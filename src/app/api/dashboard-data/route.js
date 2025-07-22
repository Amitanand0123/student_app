import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';

// This is a sample student ID. In a real app, you'd get this from the user's session.
const SAMPLE_STUDENT_ID = 'STU-12345';

export async function GET() {
  await dbConnect();

  try {
    // Find the student by their ID
    let student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID });

    // If no student is found, create a sample one for demonstration
    if (!student) {
      console.log('No student found, creating a sample student...');
      student = await Student.create({
        studentId: SAMPLE_STUDENT_ID,
        name: 'Alex Doe',
        attendancePercentage: 92.5,
        homework: [
          { subject: 'Mathematics', task: 'Chapter 5 exercises', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
          { subject: 'History', task: 'Essay on the Renaissance', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
          { subject: 'Science', task: 'Lab Report', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }, // Overdue
        ],
      });
    }

    // Process homework data
    const now = new Date();
    const pendingHomework = student.homework.filter(hw => !hw.completed && new Date(hw.dueDate) >= now).length;
    const overdueHomework = student.homework.filter(hw => !hw.completed && new Date(hw.dueDate) < now).length;

    const data = {
      name: student.name,
      attendancePercentage: student.attendancePercentage,
      homework: {
        pending: pendingHomework,
        overdue: overdueHomework,
      },
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}