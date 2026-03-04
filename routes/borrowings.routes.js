import { Router } from 'express';
import { Joi, validate } from 'express-validation';
import {
  createBorrowing,
  getAllBorrowings,
  getBorrowingById,
  returnBook,
  deleteBorrowing,
} from '../controllers/borrowings.controllers.js';

const router = Router();

const borrowingValidation = {
  body: Joi.object({
    bookId: Joi.number().integer().required(),
  }),
};

router.get('/borrowings', getAllBorrowings);
router.get('/borrowings/:id', getBorrowingById);
router.post('/borrowings', validate(borrowingValidation), createBorrowing);
router.patch('/borrowings/:id/return', returnBook);
router.delete('/borrowings/:id', deleteBorrowing);

export default router;
