import { currencies } from '../data/currencyData';

function Currencies() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Währungen</h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                            <tr>
                                <th>ISO 4217</th>
                                <th>Name</th>
                                <th>Countries</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currencies.map((currency) => (
                                <tr key={currency.code}>
                                    <td><strong>{currency.code}</strong></td>
                                    <td>{currency.name}</td>
                                    <td>{currency.countries.join(', ')}</td>
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

export default Currencies;
