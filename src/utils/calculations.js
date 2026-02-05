import { exchangeRates } from '../data/currencyData';

/**
 * Holt den Wechselkurs von einer Währung zur anderen
 * @param {string} fromCurrency - Quellwährung (z.B. 'CHF')
 * @param {string} toCurrency - Zielwährung (z.B. 'EUR')
 * @returns {number|null} - Wechselkurs oder null wenn nicht gefunden
 */
export const getExchangeRate = (fromCurrency, toCurrency) => {
    // Finde die Zeile mit der Quellwährung
    const rateRow = exchangeRates.find(rate => rate.from === fromCurrency);

    if (!rateRow) {
        return null;
    }

    // Gib den Kurs für die Zielwährung zurück
    return rateRow[toCurrency] || null;
};

/**
 * Berechnet den umgerechneten Betrag
 * @param {number} amount - Quellbetrag
 * @param {string} fromCurrency - Quellwährung
 * @param {string} toCurrency - Zielwährung
 * @returns {object} - Objekt mit targetAmount und rate
 */
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const rate = getExchangeRate(fromCurrency, toCurrency);

    if (rate === null || isNaN(amount) || amount < 0) {
        return {
            targetAmount: 0,
            rate: 0
        };
    }

    const targetAmount = amount * rate;

    return {
        targetAmount: Number(targetAmount.toFixed(2)),
        rate: rate
    };
};

/**
 * Formatiert einen Betrag als Währungsstring
 * @param {number} amount - Betrag
 * @param {string} currency - Währungscode
 * @returns {string} - Formatierter String (z.B. "100.00 CHF")
 */
export const formatCurrency = (amount, currency) => {
    return `${Number(amount).toFixed(2)} ${currency}`;
};

/**
 * Gibt alle verfügbaren Währungen für den Calculator zurück
 * (nur die, die in der Wechselkurstabelle vorkommen)
 * @returns {array} - Array von Währungscodes ['CHF', 'EUR', 'USD', 'GBP']
 */
export const getAvailableCurrencies = () => {
    return ['CHF', 'EUR', 'USD', 'GBP'];
};
