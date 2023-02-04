import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
env.config();
app.use(cors());

mongoose.connect(process.env.DBConnect);

mongoose.connection.once('open', () => {
  console.log('connected to Database');
});

app.use('/user', userRouter);
app.use('/product', productRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server started on port : `, port);
});
