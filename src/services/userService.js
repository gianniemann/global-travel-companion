import { API_BASE_URL } from '../config.js';

export const validateUser = async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) return null;
    return data.user;
};

export const addUser = async (userData) => {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (!res.ok) {
        return { success: false, message: data.message };
    }

    return { success: true, user: data.user };
};
