import app from './server/server.js';
import dbConnect from './server/config/db.js';

await dbConnect();

export default app;