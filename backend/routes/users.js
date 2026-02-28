import express from 'express';
import pool from '../db.js';

const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({ success: false, message: 'Alle Felder müssen ausgefüllt sein' });
    }

    try {
        const [existing] = await pool.query('SELECT id FROM user WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: 'Benutzername bereits vergeben' });
        }

        const [result] = await pool.query(
            'INSERT INTO user (firstName, lastName, username, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, username, password]
        );

        res.status(201).json({
            success: true,
            user: { id: result.insertId, firstName, lastName, username }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Serverfehler', error: err.message });
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT id, firstName, lastName, username FROM user WHERE username = ? AND password = ?',
            [username, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Ungültiger Benutzername oder Passwort' });
        }

        res.json({ success: true, user: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Serverfehler', error: err.message });
    }
});

export default router;
