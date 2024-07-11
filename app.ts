import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRoutes,groupRoutes,transactionRoutes,investmentRoutes, publicRouter } from './scr/routes';

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finance-app')
  .then(() => {
    console.log('Banco inicializado!');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco:', err.message);
  });

const app = express();
app.use(express.json());
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/transaction', transactionRoutes);
app.use('/investment', investmentRoutes);
app.use('',publicRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
