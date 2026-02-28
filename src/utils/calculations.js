import { API_BASE_URL } from '../config.js';

export const getExchangeRate = async (fromCurrency, toCurrency) => {
    const res = await fetch(`${API_BASE_URL}/rates/${fromCurrency}/${toCurrency}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.rate;
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    const rate = await getExchangeRate(fromCurrency, toCurrency);

    if (rate === null || isNaN(amount) || amount < 0) {
        return { targetAmount: 0, rate: 0 };
    }

    return {
        targetAmount: Number((amount * rate).toFixed(2)),
        rate: parseFloat(rate)
    };
};

export const formatCurrency = (amount, currency) => {
    return `${Number(amount).toFixed(2)} ${currency}`;
};

export const getAvailableCurrencies = async () => {
    const res = await fetch(`${API_BASE_URL}/currencies`);
    if (!res.ok) return ['CHF', 'EUR', 'USD', 'GBP'];
    const data = await res.json();
    return data.map(c => c.code);
};
