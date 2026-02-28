import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes       from './routes/users.js';
import currencyRoutes   from './routes/currencies.js';
import rateRoutes       from './routes/rates.js';
import transactionRoutes from './routes/transactions.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/users',        userRoutes);
app.use('/api/currencies',   currencyRoutes);
app.use('/api/rates',        rateRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend läuft auf http://localhost:${PORT}`);
});
