import { API_BASE_URL } from '../config.js';

export const getTransactionsByUser = async (username) => {
    const res = await fetch(`${API_BASE_URL}/transactions/${username}`);
    if (!res.ok) return [];
    return await res.json();
};

export const addTransaction = async (transactionData) => {
    const res = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData)
    });

    const data = await res.json();
    return data;
};

export const deleteTransaction = async (id) => {
    const res = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE'
    });

    const data = await res.json();
    return data.success;
};
