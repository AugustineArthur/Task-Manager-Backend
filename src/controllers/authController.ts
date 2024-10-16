import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { validate } from 'class-validator';
import User from '../models/user';
import { SignupDTO, LoginDTO } from '../dtos/auth.dto';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const signupDto = new SignupDTO();
    Object.assign(signupDto, req.body);

    const errors = await validate(signupDto);
    if (errors.length > 0) {
      res.status(400).json({ errors: errors.map(error => error.constraints ? Object.values(error.constraints) : []).flat() });
      return;
    }

    const { fullname, email, password } = signupDto;

    // Check if user already exists by email
    const existingUser = await User.query().findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    // Check if user already exists by username
    const existingUsername = await User.query().findOne({ fullname });
    if (existingUsername) {
      res.status(400).json({ message: 'User with this username already exists' });
      return;
    }

    const hashedPassword = await hash(password, 10);
    const user = await User.query().insert({ fullname, email, password: hashedPassword, role: 'user' });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const loginDto = new LoginDTO();
    Object.assign(loginDto, req.body);

    const errors = await validate(loginDto);
    if (errors.length > 0) {
      res.status(400).json({ errors: errors.map(error => error.constraints ? Object.values(error.constraints) : []).flat() });
      return;
    }

    const { email, password } = loginDto;

    const user = await User.query().findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Logged in successfully', token, user });
  } catch (error) {
    next(error);
  }
};
