import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import dotenv from 'dotenv';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutUser } from './routes/signout';
import { singupUser } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';

const app = express();
app.set('trust proxy', true);
dotenv.config();

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutUser);
app.use(singupUser);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
