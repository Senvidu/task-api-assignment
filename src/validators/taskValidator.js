import { body, param } from 'express-validator';
import mongoose from 'mongoose';

export const createTaskRules = [
  body('title')
    .isString().withMessage('Title must be a string')
    .trim()
    .notEmpty().withMessage('Title must not be empty'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status')
];

export const idParamRule = [
  param('id').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid task id');
    }
    return true;
  })
];