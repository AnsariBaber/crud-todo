import { Router } from 'express';
import passport from 'passport';
import {
  addNewMessage,
  deleteMessage,
  getUserDetailsHandler,
  getUserMessages,
  updateMessage,
} from '../controller/index.js';

export const userRoutes = Router();
//middleware to extract token from user
userRoutes.use(passport.authenticate('jwt', { session: false }));

userRoutes.get('/', getUserDetailsHandler);
userRoutes.post('/', addNewMessage);
userRoutes.get('/messages', getUserMessages);
userRoutes.post('/deleteMessage', deleteMessage);
userRoutes.post('/updateMessage', updateMessage);
