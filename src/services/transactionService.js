// Schlüssel für localStorage
const TRANSACTIONS_KEY = 'gtc_transactions';

/**
 * Holt alle Transaktionen aus dem localStorage
 * @returns {array} - Array von Transaction-Objekten
 */
export const getTransactions = () => {
    const transactionsJson = localStorage.getItem(TRANSACTIONS_KEY);
    return transactionsJson ? JSON.parse(transactionsJson) : [];
};

/**
 * Holt alle Transaktionen eines bestimmten Benutzers
 * @param {string} username - Username des Benutzers
 * @returns {array} - Array von Transaction-Objekten
 */
export const getTransactionsByUser = (username) => {
    const transactions = getTransactions();
    return transactions.filter(transaction => transaction.username === username);
};

/**
 * Fügt eine neue Transaktion hinzu
 * @param {object} transactionData - Objekt mit Transaktionsdaten
 * @returns {object} - Die gespeicherte Transaktion
 */
export const addTransaction = (transactionData) => {
    const transactions = getTransactions();

    // Neue ID generieren
    const newId = transactions.length > 0
        ? Math.max(...transactions.map(t => t.id)) + 1
        : 1;

    // Neue Transaktion erstellen
    const newTransaction = {
        id: newId,
        date: new Date().toISOString(),
        username: transactionData.username,
        sourceAmount: transactionData.sourceAmount,
        sourceCurrency: transactionData.sourceCurrency,
        targetCurrency: transactionData.targetCurrency,
        exchangeRate: transactionData.exchangeRate,
        targetAmount: transactionData.targetAmount
    };

    // Transaktion hinzufügen und speichern
    transactions.push(newTransaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));

    return newTransaction;
};

/**
 * Löscht alle Transaktionen (nur für Entwicklung/Testing)
 */
export const clearTransactions = () => {
    localStorage.removeItem(TRANSACTIONS_KEY);
};

/**
 * Löscht eine bestimmte Transaktion
 * @param {number} id - ID der zu löschenden Transaktion
 * @returns {boolean} - true bei Erfolg, false bei Fehler
 */
export const deleteTransaction = (id) => {
    const transactions = getTransactions();
    const filteredTransactions = transactions.filter(t => t.id !== id);

    if (filteredTransactions.length === transactions.length) {
        return false; // Transaktion nicht gefunden
    }

    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filteredTransactions));
    return true;
};
