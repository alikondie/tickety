import path from 'path';
import { createConnection } from 'typeorm';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('NO JWT_SECRET, IT MUST BE DEFINED');
  }

  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      synchronize: true,
      database: 'auth',
      entities: [path.join(__dirname, './entities/**/*.entity{.ts,.js}')],
      cli: {
        entitiesDir: path.join(__dirname, './entities'),
      },
    });
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log('*-- (auth) --* listening on port 3000');
  });
};

start();
