import { exchangeRates } from '../data/currencyData';

function Rates() {
    const currencies = ['CHF', 'EUR', 'USD', 'GBP'];

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Devisenkurse</h2>
                    <p className="text-muted">Stand: 01.01.2026</p>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                            <tr>
                                <th>von / nach</th>
                                {currencies.map((currency) => (
                                    <th key={currency} className="text-center">{currency}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {exchangeRates.map((rate) => (
                                <tr key={rate.from}>
                                    <td><strong>{rate.from}</strong></td>
                                    {currencies.map((currency) => (
                                        <td key={currency} className="text-end">
                                            {rate[currency].toFixed(6)}
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
