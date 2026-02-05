import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-primary text-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="py-3 mb-0">Global Travel Companion</h1>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid px-0">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/currencies">Currencies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/rates">Exchange Rates</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
