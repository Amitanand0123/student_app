import app from './server/server.js';
import dbConnect from './server/config/db.js';

// Connect to the database
await dbConnect();

// Export the app for Vercel
export default app;