import { createContext, useState, useContext, useEffect } from 'react';
import { validateUser, addUser } from '../services/userService';

// Context erstellen
const AuthContext = createContext(null);

// Provider-Komponente
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Beim Start: Prüfen ob User in localStorage gespeichert ist
    useEffect(() => {
        const savedUser = localStorage.getItem('gtc_current_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            setIsLoggedIn(true);
        }
    }, []);

    /**
     * Login-Funktion
     * @param {string} username - Username
     * @param {string} password - Passwort
     * @returns {object} - Ergebnis mit success und message
     */
    const login = (username, password) => {
        const user = validateUser(username, password);

        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            // User in localStorage speichern für Persistenz
            localStorage.setItem('gtc_current_user', JSON.stringify(user));
            return {
                success: true,
                message: 'Login erfolgreich'
            };
        }

        return {
            success: false,
            message: 'Ungültiger Benutzername oder Passwort'
        };
    };

    /**
     * Logout-Funktion
     */
    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('gtc_current_user');
    };

    /**
     * Register-Funktion
     * @param {object} userData - Objekt mit firstName, lastName, username, password
     * @returns {object} - Ergebnis mit success und message
     */
    const register = (userData) => {
        const result = addUser(userData);

        if (result.success) {
            // Automatisch einloggen nach erfolgreicher Registrierung
            setCurrentUser(result.user);
            setIsLoggedIn(true);
            localStorage.setItem('gtc_current_user', JSON.stringify(result.user));
            return {
                success: true,
                message: 'Registrierung erfolgreich'
            };
        }

        return {
            success: false,
            message: result.message
        };
    };

    // Wert der im Context zur Verfügung gestellt wird
    const value = {
        currentUser,
        isLoggedIn,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom Hook um den AuthContext zu nutzen
 * @returns {object} - Context-Wert mit currentUser, isLoggedIn, login, logout, register
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden');
    }
    return context;
};
