import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import taskRoutes from './modules/tasks/task.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'OK' }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
