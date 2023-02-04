import express from 'express';
import jwt from 'jsonwebtoken';

const adminRouter = express.Router();

adminRouter.use('/', (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).json({
      message: 'Token not found in request header',
    });
  } else {
    const user = jwt.decode(token);
    if (user?.role !== 'admin') {
      res.status(401).json({
        message: 'You Must be an admin',
      });
    } else {
      next();
    }
  }
});

export default adminRouter;
