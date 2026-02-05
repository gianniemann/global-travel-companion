import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTransactionsByUser } from '../services/transactionService';

function Transactions() {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);

    // Transaktionen beim Mounten laden
    useEffect(() => {
        if (currentUser) {
            const userTransactions = getTransactionsByUser(currentUser.username);
            // Neueste zuerst anzeigen
            setTransactions(userTransactions.reverse());
        }
    }, [currentUser]);

    // Datum formatieren
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('de-CH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Zahl formatieren
    const formatNumber = (num) => {
        return Number(num).toFixed(2);
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Meine Transaktionen</h2>

                    {transactions.length === 0 ? (
                        <div className="alert alert-info">
                            <p className="mb-0">
                                Sie haben noch keine Transaktionen gespeichert.
                                Nutzen Sie den <strong>Währungsrechner</strong>, um Transaktionen zu speichern.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-muted mb-3">
                                Anzahl Transaktionen: <strong>{transactions.length}</strong>
                            </p>

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Datum</th>
                                        <th className="text-end">Quellbetrag</th>
                                        <th>Von</th>
                                        <th>Nach</th>
                                        <th className="text-end">Wechselkurs</th>
                                        <th className="text-end">Zielbetrag</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.id}</td>
                                            <td>
                                                <small>{formatDate(transaction.date)}</small>
                                            </td>
                                            <td className="text-end">
                                                {formatNumber(transaction.sourceAmount)}
                                            </td>
                                            <td>
                          <span className="badge bg-primary">
                            {transaction.sourceCurrency}
                          </span>
                                            </td>
                                            <td>
                          <span className="badge bg-success">
                            {transaction.targetCurrency}
                          </span>
                                            </td>
                                            <td className="text-end">
                                                <small>{transaction.exchangeRate.toFixed(6)}</small>
                                            </td>
                                            <td className="text-end">
                                                <strong>{formatNumber(transaction.targetAmount)}</strong>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Zusammenfassung */}
                            <div className="card mt-4">
                                <div className="card-body">
                                    <h6 className="card-title">Statistik</h6>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="mb-1">
                                                <small className="text-muted">Gesamt Transaktionen:</small><br />
                                                <strong>{transactions.length}</strong>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-1">
                                                <small className="text-muted">Benutzer:</small><br />
                                                <strong>{currentUser.firstName} {currentUser.lastName}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Transactions;
