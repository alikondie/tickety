import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutUser } from './routes/signout';
import { singupUser } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';

const app = express();
dotenv.config();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutUser);
app.use(singupUser);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'auth',
    });
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log('*-- (auth) --* listening on port 3000');
  });
};

start();
