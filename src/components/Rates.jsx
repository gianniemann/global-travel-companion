import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config.js';

function Rates() {
    const [currencies, setCurrencies] = useState([]);
    const [rates, setRates] = useState([]);

    useEffect(() => {
        // Währungen laden
        fetch(`${API_BASE_URL}/currencies`)
            .then(res => res.json())
            .then(data => setCurrencies(data.map(c => c.code)));

        // Kurse laden
        fetch(`${API_BASE_URL}/rates`)
            .then(res => res.json())
            .then(data => setRates(data));
    }, []);

    // Kurse in Matrix-Format umwandeln: { CHF: { EUR: 1.07, USD: 1.13, ... }, ... }
    const rateMatrix = rates.reduce((acc, row) => {
        if (!acc[row.fromCurrency]) acc[row.fromCurrency] = {};
        acc[row.fromCurrency][row.toCurrency] = parseFloat(row.rate);
        return acc;
    }, {});

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Devisenkurse</h2>
                    <p className="text-muted">Daten aus Datenbank</p>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                            <tr>
                                <th>von / nach</th>
                                {currencies.map(c => (
                                    <th key={c} className="text-center">{c}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {currencies.map(from => (
                                <tr key={from}>
                                    <td><strong>{from}</strong></td>
                                    {currencies.map(to => (
                                        <td key={to} className="text-end">
                                            {rateMatrix[from]?.[to]?.toFixed(6) ?? '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rates;
