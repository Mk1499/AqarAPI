import express from 'express';
import User from '../models/user.js';
import Product from '../models/product.js';
import jwt from 'jsonwebtoken';
import adminMiddleware from '../middleware/admin.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  user
    .save()
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userData = await User.findOne(
    {
      email,
      password,
    },
    { password: 0 }
  );
  if (userData) {
    const token = jwt.sign(JSON.stringify(userData), process.env.EncKey);
    res.status(200).json({ token });
  } else {
    res.status(404).json({
      message: 'User not found',
    });
  }
});

userRouter.get('/', adminMiddleware, async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json(allUser);
});

userRouter.get('/:id', adminMiddleware, async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(id);
  if (user) {
    const products = await Product.find({ owner: id }, { _id: 1 });
    user['products'] = products;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});

userRouter.delete('/', adminMiddleware, (req, res) => {
  User.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted',
      });
    })
    .catch((err) => {
      res.json(400).json({ err });
    });
});

export default userRouter;
