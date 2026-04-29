import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

import { router as pagesRouter } from './routes/pages.js';
import { router as authRouter } from './routes/auth.js';
import uploadRoutes from "./routes/upload.js";

// defining directory variable
const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Initialize environment variables
const app = express();
const port = 3000;

// Middleware/views
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(rootDir, '../frontend/views'));
app.use(express.static(path.join(rootDir, '../frontend')));

// Routes
app.use('/', pagesRouter);
app.use('/auth', authRouter);
app.use("/api", uploadRoutes);


// Start server
app.listen(port, () => {
  console.log(`system initialized at http://localhost:${port}`);
});

export default app;