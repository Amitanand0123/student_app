import mongoose from 'mongoose';

const HomeworkSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  task: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

const GradeSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    term: { type: String, required: true }, // e.g., "Fall 2024", "Spring 2025"
});

const TimetableEntrySchema = new mongoose.Schema({
    day: { type: String, required: true }, // e.g., "Monday"
    period: { type: String, required: true }, // e.g., "9:00 AM - 10:00 AM"
    subject: { type: String, required: true },
    teacher: { type: String },
});

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  profilePicture: { type: String },
  attendancePercentage: { type: Number, default: 100 },
  homework: [HomeworkSchema],
  grades: [GradeSchema],
  timetable: [TimetableEntrySchema],
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);