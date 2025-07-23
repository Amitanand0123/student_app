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
    term: { type: String, required: true },
});

const TimetableEntrySchema = new mongoose.Schema({
    day: { type: String, required: true },
    period: { type: String, required: true },
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