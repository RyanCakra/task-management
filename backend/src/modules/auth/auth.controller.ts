import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import { sendSuccess, sendError } from '../../utils/response';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      sendError(res, 'All fields are required');
      return;
    }
    if (password.length < 6) {
      sendError(res, 'Password must be at least 6 characters');
      return;
    }

    const user = await registerUser(name, email, password);
    sendSuccess(res, 'User registered successfully', user, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    sendError(res, message);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, 'Email and password are required');
      return;
    }

    const result = await loginUser(email, password);
    sendSuccess(res, 'Login successful', result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Login failed';
    sendError(res, message, 401);
  }
};
