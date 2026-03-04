import { Router } from 'express';
import { Joi, validate } from 'express-validation';
import {
  createCategory,
  getAllCategories,
  getBooksByCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controllers.js';

const router = Router();

const categoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const updateCategoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.get('/categories/:id/books', getBooksByCategory);
router.post('/categories', validate(categoryValidation), createCategory);
router.put(
  '/categories/:id',
  validate(updateCategoryValidation),
  updateCategory,
);
router.delete('/categories/:id', deleteCategory);

export default router;
