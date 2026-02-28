import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
            setError('Bitte alle Felder ausfüllen');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwörter stimmen nicht überein');
            return;
        }

        if (formData.password.length < 4) {
            setError('Passwort muss mindestens 4 Zeichen lang sein');
            return;
        }

        const result = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            password: formData.password
        });

        if (result.success) {
            setSuccess('Registrierung erfolgreich! Weiterleitung...');
            setTimeout(() => {
                navigate('/gtc/');
            }, 1500);
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
                            <h2 className="card-title text-center mb-4">Registrierung</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        Vorname
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Vorname eingeben"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Nachname
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Nachname eingeben"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Benutzername
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Benutzername wählen"
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Passwort eingeben"
                                    />
                                    <small className="text-muted">Mindestens 4 Zeichen</small>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Passwort bestätigen
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Passwort wiederholen"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mb-3">
                                    Registrieren
                                </button>
                            </form>

                            <hr />

                            <div className="text-center">
                                <p className="mb-2">Bereits registriert?</p>
                                <Link to="/gtc/login" className="btn btn-outline-secondary">
                                    Zum Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
