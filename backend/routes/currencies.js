import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/currencies
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT code, name FROM currency');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler', error: err.message });
    }
});

export default router;
