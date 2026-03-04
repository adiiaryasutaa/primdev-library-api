import express from 'express';
import authRouter from './auth.routes.js';
import booksRouter from './books.routes.js';
import usersRouter from './users.routes.js';
import borrowingsRouter from './borrowings.routes.js';
import categoriesRouter from './categories.routes.js';
import authenticateToken from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Library API is running');
});

router.use('/api', authRouter);
router.use('/api', booksRouter);
router.use('/api', authenticateToken, usersRouter);
router.use('/api', authenticateToken, borrowingsRouter);
router.use('/api', authenticateToken, categoriesRouter);

export default router;
