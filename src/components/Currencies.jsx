import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config.js';

function Currencies() {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/currencies`)
            .then(res => res.json())
            .then(data => setCurrencies(data));
    }, []);

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
                                <th>Länder</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currencies.map((currency) => (
                                <tr key={currency.code}>
                                    <td><strong>{currency.code}</strong></td>
                                    <td>{currency.name}</td>
                                    <td>{currency.countries}</td>
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
