import { createContext, useState, useContext, useEffect } from 'react';
import { validateUser, addUser } from '../services/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn]   = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('gtc_current_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (username, password) => {
        const user = await validateUser(username, password);

        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            localStorage.setItem('gtc_current_user', JSON.stringify(user));
            return { success: true, message: 'Login erfolgreich' };
        }

        return { success: false, message: 'Ungültiger Benutzername oder Passwort' };
    };

    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('gtc_current_user');
    };

    const register = async (userData) => {
        const result = await addUser(userData);

        if (result.success) {
            setCurrentUser(result.user);
            setIsLoggedIn(true);
            localStorage.setItem('gtc_current_user', JSON.stringify(result.user));
            return { success: true, message: 'Registrierung erfolgreich' };
        }

        return { success: false, message: result.message };
    };

    const value = { currentUser, isLoggedIn, login, logout, register };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden');
    }
    return context;
};
