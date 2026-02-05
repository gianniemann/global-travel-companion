import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAvailableCurrencies, convertCurrency } from '../utils/calculations';
import { addTransaction } from '../services/transactionService';

function Calculator() {
    const { isLoggedIn, currentUser } = useAuth();
    const availableCurrencies = getAvailableCurrencies();

    const [sourceAmount, setSourceAmount] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('CHF');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [targetAmount, setTargetAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [saveTransaction, setSaveTransaction] = useState(false);
    const [message, setMessage] = useState('');

    // Berechnung durchführen wenn sich Werte ändern
    useEffect(() => {
        if (sourceAmount && !isNaN(sourceAmount) && parseFloat(sourceAmount) > 0) {
            const result = convertCurrency(
                parseFloat(sourceAmount),
                sourceCurrency,
                targetCurrency
            );
            setTargetAmount(result.targetAmount);
            setExchangeRate(result.rate);
        } else {
            setTargetAmount(0);
            setExchangeRate(0);
        }
    }, [sourceAmount, sourceCurrency, targetCurrency]);

    const handleCalculate = () => {
        setMessage('');

        if (!sourceAmount || isNaN(sourceAmount) || parseFloat(sourceAmount) <= 0) {
            setMessage('Bitte geben Sie einen gültigen Betrag ein');
            return;
        }

        // Wenn Speichern aktiviert ist und User eingeloggt
        if (saveTransaction && isLoggedIn && currentUser) {
            const transaction = {
                username: currentUser.username,
                sourceAmount: parseFloat(sourceAmount),
                sourceCurrency: sourceCurrency,
                targetCurrency: targetCurrency,
                exchangeRate: exchangeRate,
                targetAmount: targetAmount
            };

            addTransaction(transaction);
            setMessage('Transaktion erfolgreich gespeichert!');

            // Formular zurücksetzen nach Speichern
            setTimeout(() => {
                setSourceAmount('');
                setTargetAmount(0);
                setSaveTransaction(false);
                setMessage('');
            }, 2000);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="mb-4">Währungsrechner</h2>

                    {message && (
                        <div className="alert alert-success" role="alert">
                            {message}
                        </div>
                    )}

                    <div className="card shadow">
                        <div className="card-body p-4">

                            {/* Quellwährung */}
                            <div className="row mb-4">
                                <div className="col-md-7">
                                    <label htmlFor="sourceAmount" className="form-label">
                                        Betrag
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        id="sourceAmount"
                                        value={sourceAmount}
                                        onChange={(e) => setSourceAmount(e.target.value)}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="sourceCurrency" className="form-label">
                                        Von
                                    </label>
                                    <select
                                        className="form-select form-select-lg"
                                        id="sourceCurrency"
                                        value={sourceCurrency}
                                        onChange={(e) => setSourceCurrency(e.target.value)}
                                    >
                                        {availableCurrencies.map((currency) => (
                                            <option key={currency} value={currency}>
                                                {currency}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Wechselkurs Anzeige */}
                            {exchangeRate > 0 && (
                                <div className="text-center mb-3">
                                    <small className="text-muted">
                                        Wechselkurs: 1 {sourceCurrency} = {exchangeRate.toFixed(6)} {targetCurrency}
                                    </small>
                                </div>
                            )}

                            {/* Trennlinie mit Icon */}
                            <div className="text-center mb-4">
                                <span className="badge bg-primary">⇓</span>
                            </div>

                            {/* Zielwährung */}
                            <div className="row mb-4">
                                <div className="col-md-7">
                                    <label htmlFor="targetAmount" className="form-label">
                                        Ergebnis
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light"
                                        id="targetAmount"
                                        value={targetAmount.toFixed(2)}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="targetCurrency" className="form-label">
                                        Nach
                                    </label>
                                    <select
                                        className="form-select form-select-lg"
                                        id="targetCurrency"
                                        value={targetCurrency}
                                        onChange={(e) => setTargetCurrency(e.target.value)}
                                    >
                                        {availableCurrencies.map((currency) => (
                                            <option key={currency} value={currency}>
                                                {currency}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Speichern-Option (nur für eingeloggte User) */}
                            {isLoggedIn ? (
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="saveTransaction"
                                            checked={saveTransaction}
                                            onChange={(e) => setSaveTransaction(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="saveTransaction">
                                            Transaktion speichern
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="alert alert-info">
                                    <small>
                                        <strong>Hinweis:</strong> Melden Sie sich an, um Transaktionen zu speichern.
                                    </small>
                                </div>
                            )}

                            {/* Button */}
                            {isLoggedIn && saveTransaction && (
                                <button
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={handleCalculate}
                                >
                                    Berechnen und Speichern
                                </button>
                            )}

                        </div>
                    </div>

                    {/* Berechnungsbeispiel */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h6 className="card-title">Beispiel:</h6>
                            <p className="card-text mb-0">
                                <small className="text-muted">
                                    100 CHF → EUR = 100 × 1.073860 = 107.39 EUR
                                </small>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Calculator;
