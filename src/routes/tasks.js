import express from 'express';
import Task from '../models/Task.js';
import { asyncHandler, validate } from '../middleware/errorHandler.js';
import { createTaskRules, idParamRule } from '../validators/taskValidator.js';

const router = express.Router();

// POST /tasks -> create
router.post('/', createTaskRules, validate, asyncHandler(async (req, res) => {
  const { title, description = '', status } = req.body;
  const task = await Task.create({ title, description, status });
  res.status(201).json(task);
}));

// GET /tasks -> list all
router.get('/', asyncHandler(async (_req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
}));

// GET /tasks/:id -> retrieve by id
router.get('/:id', idParamRule, validate, asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'NotFound', message: 'Task not found' });
  }
  res.json(task);
}));

// DELETE /tasks/:id -> delete by id
router.delete('/:id', idParamRule, validate, asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'NotFound', message: 'Task not found' });
  }
  res.status(204).send();
}));

export default router;