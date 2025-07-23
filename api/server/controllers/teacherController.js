import asyncHandler from 'express-async-handler';

const contactTeacher = asyncHandler(async (req, res) => {
  const { teacher, subject, message } = req.body;

  console.log("--- New Message to Teacher ---");
  console.log("To:", teacher);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("----------------------------");

  res.status(200).json({ message: 'Message sent successfully' });
});

export { contactTeacher };