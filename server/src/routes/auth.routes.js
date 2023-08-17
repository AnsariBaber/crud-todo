import { Router } from 'express';
import { login, register } from '../controller/index.js';
import { catchAsync } from '../middlewares/index.js';
export const authRoutes = Router();

authRoutes.post('/register', catchAsync(register));
authRoutes.post('/login', catchAsync(login));
