import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';
// import path from 'path';
import timeout from 'connect-timeout';

import { serverError, passportMiddleware } from './middlewares/index.js';
import { authRoutes, userRoutes } from './routes/index.js';
import { connectDB } from './db/conn.js';

const app = express();
const { PORT } = process.env;

// static folder
// app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(timeout('60000s'));
app.use(cors());
app.use(passport.initialize());
passportMiddleware(passport);

// DB CONNECT
const main = async () => {
  app.listen(PORT, async () => {
    console.log(`Server Running On Port ${PORT}`);
    await connectDB();
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

//---------------- API ROUTES --------------------

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.json('server started');
});

app.use(serverError);
