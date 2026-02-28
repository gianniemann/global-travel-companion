import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Bitte alle Felder ausfüllen');
            return;
        }

        const result = await login(username, password);

        if (result.success) {
            navigate('/gtc/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Login</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Benutzername
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Benutzername eingeben"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Passwort
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Passwort eingeben"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mb-3">
                                    Anmelden
                                </button>
                            </form>

                            <hr />

                            <div className="text-center">
                                <p className="mb-2">Noch kein Konto?</p>
                                <Link to="/gtc/register" className="btn btn-outline-secondary">
                                    Jetzt registrieren
                                </Link>
                            </div>

                            <hr />

                            <div className="card bg-light mt-3">
                                <div className="card-body py-2">
                                    <small className="text-muted">
                                        <strong>Demo-Login:</strong><br />
                                        Benutzername: <code>max</code><br />
                                        Passwort: <code>password</code>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
