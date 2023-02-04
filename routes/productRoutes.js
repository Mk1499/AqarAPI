import express from 'express';
import Product from '../models/product.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const productRouter = express.Router();

productRouter.post('/add', (req, res) => {
  const { title, address, country, state, type, coverImg, status, price } =
    req.body;

  const product = new Product({
    title,
    address,
    country,
    state,
    type,
    coverImg,
    status,
    price,
  });

  product
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

productRouter.get('/', async (req, res) => {
  Product.find({})
    .populate('owner')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

productRouter.delete('/', (req, res) => {
  Product.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted',
      });
    })
    .catch((err) => {
      res.json(400).json({ err });
    });
});

productRouter.post('/buy', async (req, res) => {
  const { userID, productID } = req.body;

  const product = await Product.findById(productID);
  if (product && product.status === 'Available') {
    Product.findOneAndUpdate(
      { _id: productID },
      {
        $set: {
          owner: userID,
          status: 'sold',
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          message: 'sold',
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(400).json({
      message: 'Sorry but this product is not availbale to buy',
    });
  }
});

productRouter.post('/free', async (req, res) => {
  const { productID } = req.body;

  Product.findOneAndUpdate(
    { _id: productID },
    {
      $set: {
        owner: null,
        status: 'Available',
      },
    }
  )
    .then((data) => {
      res.status(200).json({
        message: 'Product is Available now',
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

export default productRouter;
