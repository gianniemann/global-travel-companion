import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/rates  →  alle Kurse
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT fromCurrency, toCurrency, rate FROM rate');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler', error: err.message });
    }
});

// GET /api/rates/:from/:to  →  einzelner Kurs
router.get('/:from/:to', async (req, res) => {
    const { from, to } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT rate FROM rate WHERE fromCurrency = ? AND toCurrency = ?',
            [from.toUpperCase(), to.toUpperCase()]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Kurs nicht gefunden' });
        }

        res.json({ from: from.toUpperCase(), to: to.toUpperCase(), rate: rows[0].rate });
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler', error: err.message });
    }
});

export default router;
