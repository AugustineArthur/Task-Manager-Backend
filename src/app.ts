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


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));


app.use(express.json());

// Swagger documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Default route
app.post('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});


export default app;