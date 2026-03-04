import { Router } from 'express';
import { Joi, validate } from 'express-validation';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserBorrowings,
} from '../controllers/users.controllers.js';

const router = Router();

const userValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('USER', 'ADMIN'),
  }),
};

const updateUserValidation = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid('USER', 'ADMIN'),
  }),
};

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/users/:id/borrows', getUserBorrowings);
router.post('/users', validate(userValidation), createUser);
router.put('/users/:id', validate(updateUserValidation), updateUser);
router.delete('/users/:id', deleteUser);

export default router;
