import { validationResult } from 'express-validator';

// Wrapper to handle async errors so we don't need try/catch everywhere
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validate request and send 422 if invalid
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: 'ValidationError',
      details: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// 404
export const notFound = (req, res, _next) => {
  res.status(404).json({ error: 'NotFound', message: 'Route not found' });
};

// Central error handler
export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const payload = {
    error: err.name || 'ServerError',
    message: err.message || 'Something went wrong'
  };
  res.status(status).json(payload);
};