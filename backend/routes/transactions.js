import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/transactions/:username
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM transaction WHERE username = ? ORDER BY date DESC',
            [username]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler', error: err.message });
    }
});

// POST /api/transactions
router.post('/', async (req, res) => {
    const { username, sourceAmount, sourceCurrency, targetCurrency, exchangeRate, targetAmount } = req.body;

    if (!username || !sourceAmount || !sourceCurrency || !targetCurrency || !exchangeRate || !targetAmount) {
        return res.status(400).json({ message: 'Alle Felder müssen ausgefüllt sein' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO transaction
             (username, sourceAmount, sourceCurrency, targetCurrency, exchangeRate, targetAmount)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [username, sourceAmount, sourceCurrency, targetCurrency, exchangeRate, targetAmount]
        );

        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler', error: err.message });
    }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM transaction WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Transaktion nicht gefunden' });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler', error: err.message });
    }
});

export default router;
