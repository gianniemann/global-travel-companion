import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { isLoggedIn, currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-primary text-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <h1 className="mb-0">Global Travel Companion</h1>
                            {isLoggedIn && currentUser && (
                                <div className="text-end">
                                    <small className="d-block">Angemeldet als:</small>
                                    <strong>{currentUser.firstName} {currentUser.lastName}</strong>
                                </div>
                            )}
                        </div>
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
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/currencies">Currencies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/rates">Exchange Rates</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/gtc/calculator">Calculator</Link>
                                </li>
                                {isLoggedIn && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/gtc/transactions">Transactions</Link>
                                    </li>
                                )}
                            </ul>

                            <ul className="navbar-nav">
                                {!isLoggedIn ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/gtc/login">
                                                <i className="bi bi-box-arrow-in-right"></i> Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/gtc/register">
                                                <i className="bi bi-person-plus"></i> Register
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn btn-link text-white"
                                            onClick={handleLogout}
                                        >
                                            <i className="bi bi-box-arrow-right"></i> Logout
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
