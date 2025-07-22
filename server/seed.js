import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';
import dbConnect from './config/db.js';

dotenv.config();
await dbConnect();

const SAMPLE_STUDENT_ID = 'STU-12345';

const seedData = async () => {
  try {
    await Student.deleteMany({ studentId: SAMPLE_STUDENT_ID });
    console.log('Old data cleared...');

    await Student.create({
      studentId: SAMPLE_STUDENT_ID,
      name: 'Ananya Sharma',
      class: '10th Grade - Section B',
      profilePicture: `https://randomuser.me/api/portraits/women/65.jpg`,
      attendancePercentage: 96.3,
      homework: [
        { subject: 'Mathematics', task: 'Trigonometry Worksheet', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: false },
        { subject: 'Science', task: 'Chemistry Chapter 4 Notes', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), completed: false },
        { subject: 'English', task: 'Write a summary of "The Merchant of Venice"', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), completed: true },
        { subject: 'Social Studies', task: 'Prepare notes on Indian Freedom Struggle', dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), completed: false },
        { subject: 'Hindi', task: 'Write an essay on "Swachh Bharat Abhiyan"', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: true },
      ],
      grades: [
        { subject: 'Mathematics', score: 89, term: "Term 1 - 2025" },
        { subject: 'Science', score: 93, term: "Term 1 - 2025" },
        { subject: 'English', score: 85, term: "Term 1 - 2025" },
        { subject: 'Social Studies', score: 88, term: "Term 1 - 2025" },
        { subject: 'Hindi', score: 91, term: "Term 1 - 2025" },
        { subject: 'Computer Science', score: 94, term: "Term 1 - 2025" },
        { subject: 'Mathematics', score: 92, term: "Term 2 - 2025" },
        { subject: 'Science', score: 90, term: "Term 2 - 2025" },
        { subject: 'English', score: 87, term: "Term 2 - 2025" },
        { subject: 'Social Studies', score: 84, term: "Term 2 - 2025" },
        { subject: 'Hindi', score: 89, term: "Term 2 - 2025" },
        { subject: 'Computer Science', score: 96, term: "Term 2 - 2025" }
      ],
      timetable: [
        // Monday
        { day: "Monday", period: "09:00 - 09:45", subject: "Mathematics", teacher: "Mr. Rakesh Verma" },
        { day: "Monday", period: "09:50 - 10:35", subject: "Science", teacher: "Ms. Priya Mehta" },
        { day: "Monday", period: "10:40 - 11:25", subject: "English", teacher: "Mr. Rahul Kapoor" },
        { day: "Monday", period: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Kavita Mishra" },
        { day: "Monday", period: "12:20 - 01:05", subject: "Computer Science", teacher: "Mr. Anil Joshi" },
        
        // Tuesday
        { day: "Tuesday", period: "09:00 - 09:45", subject: "Social Studies", teacher: "Mr. Sanjay Rao" },
        { day: "Tuesday", period: "09:50 - 10:35", subject: "Science", teacher: "Ms. Priya Mehta" },
        { day: "Tuesday", period: "10:40 - 11:25", subject: "Mathematics", teacher: "Mr. Rakesh Verma" },
        { day: "Tuesday", period: "11:30 - 12:15", subject: "English", teacher: "Mr. Rahul Kapoor" },
        { day: "Tuesday", period: "12:20 - 01:05", subject: "Art", teacher: "Mrs. Neeta Shukla" },

        // Wednesday
        { day: "Wednesday", period: "09:00 - 09:45", subject: "Hindi", teacher: "Mrs. Kavita Mishra" },
        { day: "Wednesday", period: "09:50 - 10:35", subject: "Science", teacher: "Ms. Priya Mehta" },
        { day: "Wednesday", period: "10:40 - 11:25", subject: "Computer Science", teacher: "Mr. Anil Joshi" },
        { day: "Wednesday", period: "11:30 - 12:15", subject: "Social Studies", teacher: "Mr. Sanjay Rao" },
        { day: "Wednesday", period: "12:20 - 01:05", subject: "Physical Education", teacher: "Mr. Manoj Singh" },

        // Thursday
        { day: "Thursday", period: "09:00 - 09:45", subject: "Mathematics", teacher: "Mr. Rakesh Verma" },
        { day: "Thursday", period: "09:50 - 10:35", subject: "English", teacher: "Mr. Rahul Kapoor" },
        { day: "Thursday", period: "10:40 - 11:25", subject: "Hindi", teacher: "Mrs. Kavita Mishra" },
        { day: "Thursday", period: "11:30 - 12:15", subject: "Art", teacher: "Mrs. Neeta Shukla" },
        { day: "Thursday", period: "12:20 - 01:05", subject: "Computer Science", teacher: "Mr. Anil Joshi" },

        // Friday
        { day: "Friday", period: "09:00 - 09:45", subject: "Science", teacher: "Ms. Priya Mehta" },
        { day: "Friday", period: "09:50 - 10:35", subject: "Mathematics", teacher: "Mr. Rakesh Verma" },
        { day: "Friday", period: "10:40 - 11:25", subject: "Social Studies", teacher: "Mr. Sanjay Rao" },
        { day: "Friday", period: "11:30 - 12:15", subject: "English", teacher: "Mr. Rahul Kapoor" },
        { day: "Friday", period: "12:20 - 01:05", subject: "Physical Education", teacher: "Mr. Manoj Singh" }
      ]
    });

    console.log('📦 Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding data: ${error}`);
    process.exit(1);
  }
};

seedData();
