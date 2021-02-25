import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import { BadRequestError } from '../errors/bad-request';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim().notEmpty().withMessage('No password provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('incorrect email or password');
    }

    const isPasswordMatch = await Password.compare(user.password, password);

    if (!isPasswordMatch) {
      throw new BadRequestError('incorrect email or password');
    }
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!
    );
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send({ email, id: user.id });
  }
);

export { router as signinRouter };
