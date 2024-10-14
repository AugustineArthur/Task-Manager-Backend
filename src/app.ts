import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import swaggerSpec from './config/swagger';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
// }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Log requests to the console
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Swagger documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Log response status
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}`);
  next();
});

// Default route
app.post('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});


export default app;