import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAvailableCurrencies, convertCurrency } from '../utils/calculations';
import { addTransaction } from '../services/transactionService';

function Calculator() {
    const { isLoggedIn, currentUser } = useAuth();

    const [availableCurrencies, setAvailableCurrencies] = useState([]);
    const [sourceAmount,    setSourceAmount]    = useState('');
    const [sourceCurrency,  setSourceCurrency]  = useState('CHF');
    const [targetCurrency,  setTargetCurrency]  = useState('EUR');
    const [targetAmount,    setTargetAmount]    = useState(0);
    const [exchangeRate,    setExchangeRate]    = useState(0);
    const [saveTransaction, setSaveTransaction] = useState(false);
    const [message,         setMessage]         = useState('');
    const [messageType,     setMessageType]     = useState('success');

    // Währungen beim Start laden
    useEffect(() => {
        getAvailableCurrencies().then(setAvailableCurrencies);
    }, []);

    // Live-Konvertierung
    useEffect(() => {
        if (sourceAmount && !isNaN(sourceAmount) && parseFloat(sourceAmount) > 0) {
            convertCurrency(parseFloat(sourceAmount), sourceCurrency, targetCurrency)
                .then(result => {
                    setTargetAmount(result.targetAmount);
                    setExchangeRate(result.rate);
                });
        } else {
            setTargetAmount(0);
            setExchangeRate(0);
        }
    }, [sourceAmount, sourceCurrency, targetCurrency]);

    const handleCalculate = async () => {
        setMessage('');

        if (!sourceAmount || isNaN(sourceAmount) || parseFloat(sourceAmount) <= 0) {
            setMessage('Bitte geben Sie einen gültigen Betrag ein');
            setMessageType('danger');
            return;
        }

        if (saveTransaction && isLoggedIn && currentUser) {
            const transaction = {
                username:       currentUser.username,
                sourceAmount:   parseFloat(sourceAmount),
                sourceCurrency: sourceCurrency,
                targetCurrency: targetCurrency,
                exchangeRate:   exchangeRate,
                targetAmount:   targetAmount
            };

            await addTransaction(transaction);
            setMessage('Transaktion erfolgreich gespeichert!');
            setMessageType('success');

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
                        <div className={`alert alert-${messageType}`} role="alert">
                            {message}
                        </div>
                    )}

                    <div className="card shadow">
                        <div className="card-body p-4">

                            <div className="row mb-4">
                                <div className="col-md-7">
                                    <label htmlFor="sourceAmount" className="form-label">Betrag</label>
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
                                    <label htmlFor="sourceCurrency" className="form-label">Von</label>
                                    <select
                                        className="form-select form-select-lg"
                                        id="sourceCurrency"
                                        value={sourceCurrency}
                                        onChange={(e) => setSourceCurrency(e.target.value)}
                                    >
                                        {availableCurrencies.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {exchangeRate > 0 && (
                                <div className="text-center mb-3">
                                    <small className="text-muted">
                                        Wechselkurs: 1 {sourceCurrency} = {exchangeRate.toFixed(6)} {targetCurrency}
                                    </small>
                                </div>
                            )}

                            <div className="text-center mb-4">
                                <span className="badge bg-primary">⇓</span>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-7">
                                    <label htmlFor="targetAmount" className="form-label">Ergebnis</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light"
                                        id="targetAmount"
                                        value={targetAmount.toFixed(2)}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="targetCurrency" className="form-label">Nach</label>
                                    <select
                                        className="form-select form-select-lg"
                                        id="targetCurrency"
                                        value={targetCurrency}
                                        onChange={(e) => setTargetCurrency(e.target.value)}
                                    >
                                        {availableCurrencies.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

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
                </div>
            </div>
        </div>
    );
}

export default Calculator;
