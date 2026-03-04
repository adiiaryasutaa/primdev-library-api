import 'dotenv/config';
import prisma from '../database/config.database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    const { password: _, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ message: 'Login successful', user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred during login',
      details: error.message,
    });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const count = await prisma.users.count({ where: { email } });

  if (count > 0) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const hashedPassword = bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS);

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: prisma.users.role.USER,
      },
      select: { password: false },
    });

    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred during registration',
      details: error.message,
    });
  }
};
