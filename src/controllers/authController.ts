import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { compare, hash } from 'bcrypt';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullname, email, password } = req.body;
    console.log({fullname, email, password});
    const hashedPassword = await hash(password, 10);
    
    const user = await User.query().insert({
      fullname,
      username: email.split('@')[0],
      email,
      password: hashedPassword,
      role: 'user'
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
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