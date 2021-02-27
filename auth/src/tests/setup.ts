import { app } from '../app';
import path from 'path';
import { createConnection, getConnection } from 'typeorm';
import request from 'supertest';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

beforeAll(async () => {
  try {
    process.env.JWT_SECRET = 'sdqdaze';
    await createConnection({
      type: 'postgres',
      host: process.env.DB_TEST_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_TEST_PASS,
      synchronize: true,
      database: 'auth_test',
      entities: [path.join(__dirname, '../entities/**/*.entity{.ts,.js}')],
      cli: {
        entitiesDir: path.join(__dirname, './entities'),
      },
    });
  } catch (error) {
    console.log('--------beforeAll-----\n', error);
  }
});

beforeEach(async () => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
});

afterAll(async () => {
  await getConnection().close();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
