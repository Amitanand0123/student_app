import asyncHandler from 'express-async-handler';

// @desc    Handle teacher contact form
// @route   POST /api/teachers/contact
// @access  Public
const contactTeacher = asyncHandler(async (req, res) => {
  const { teacher, subject, message } = req.body;

  // In a real app, you would use a service like Nodemailer to send an email.
  // For this example, we'll just log it to the console.
  console.log("--- New Message to Teacher ---");
  console.log("To:", teacher);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("----------------------------");

  // Simulate a successful operation
  res.status(200).json({ message: 'Message sent successfully' });
});

export { contactTeacher };