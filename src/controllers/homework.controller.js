import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';
import mongoose from 'mongoose';

const SAMPLE_STUDENT_ID = 'STU-12345';

export async function getHomework() {
    await dbConnect();
    try {
        const student = await Student.findOne({ studentId: SAMPLE_STUDENT_ID }).select('homework');
        if (!student) {
            return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: student.homework });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function updateHomework(request) {
    await dbConnect();
    try {
        const { id, completed } = await request.json();
        if (!id || typeof completed !== 'boolean') {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const result = await Student.updateOne(
            { studentId: SAMPLE_STUDENT_ID, 'homework._id': new mongoose.Types.ObjectId(id) },
            { $set: { 'homework.$.completed': completed } }
        );
        
        if (result.nModified === 0) {
            return NextResponse.json({ success: false, message: 'Homework not found or no change made' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Homework updated' });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}