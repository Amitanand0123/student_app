import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';

const SAMPLE_STUDENT_ID = 'STU-12345';

export async function getGrades() {
    await dbConnect();
    try {
        const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID }).select('grades -_id');
        if (!student) {
            return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: student.grades });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}