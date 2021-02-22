import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutUser } from './routes/signout';
import { singupUser } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutUser);
app.use(singupUser);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('*-- (auth) --* listening on port 3000');
});
