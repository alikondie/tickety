import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../Entities/User.entity';
import { RequestValidationError } from '../errors/request-validation';
import { TUser } from '../types/User';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email not valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request<TUser>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in use');
      return res.send({});
    }

    const user = User.create({ email, password });
    await user.save();

    res.status(201).send(user);

    res.send({});
  }
);

export { router as singupUser };
