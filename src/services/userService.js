// Schlüssel für localStorage
const USERS_KEY = 'gtc_users';

/**
 * Initialisiert Demo-Benutzer wenn noch keine vorhanden sind
 */
const initializeUsers = () => {
    const users = getUsers();
    if (users.length === 0) {
        // Demo-Benutzer für Testzwecke
        const demoUsers = [
            {
                id: 1,
                firstName: 'Max',
                lastName: 'Mustermann',
                username: 'max',
                password: 'password'
            },
            {
                id: 2,
                firstName: 'Anna',
                lastName: 'Schmidt',
                username: 'anna',
                password: 'password'
            }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
    }
};

/**
 * Holt alle Benutzer aus dem localStorage
 * @returns {array} - Array von User-Objekten
 */
export const getUsers = () => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
};

/**
 * Sucht einen Benutzer anhand des Usernames
 * @param {string} username - Username
 * @returns {object|null} - User-Objekt oder null
 */
export const getUserByUsername = (username) => {
    const users = getUsers();
    return users.find(user => user.username === username) || null;
};

/**
 * Validiert Login-Credentials
 * @param {string} username - Username
 * @param {string} password - Passwort
 * @returns {object|null} - User-Objekt ohne Passwort oder null bei Fehler
 */
export const validateUser = (username, password) => {
    const user = getUserByUsername(username);

    if (user && user.password === password) {
        // Passwort nicht zurückgeben (Sicherheit)
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    return null;
};

/**
 * Fügt einen neuen Benutzer hinzu
 * @param {object} userData - Objekt mit firstName, lastName, username, password
 * @returns {object} - Ergebnis mit success und message/user
 */
export const addUser = (userData) => {
    const users = getUsers();

    // Prüfen ob Username bereits existiert
    const existingUser = getUserByUsername(userData.username);
    if (existingUser) {
        return {
            success: false,
            message: 'Benutzername bereits vergeben'
        };
    }

    // Validierung
    if (!userData.firstName || !userData.lastName || !userData.username || !userData.password) {
        return {
            success: false,
            message: 'Alle Felder müssen ausgefüllt sein'
        };
    }

    // Neue ID generieren
    const newId = users.length > 0
        ? Math.max(...users.map(u => u.id)) + 1
        : 1;

    // Neuen User erstellen
    const newUser = {
        id: newId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password
    };

    // User hinzufügen und speichern
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // User ohne Passwort zurückgeben
    const { password: _, ...userWithoutPassword } = newUser;

    return {
        success: true,
        user: userWithoutPassword
    };
};

/**
 * Löscht alle Benutzer (nur für Entwicklung/Testing)
 */
export const clearUsers = () => {
    localStorage.removeItem(USERS_KEY);
};

// Initialisiere Demo-Benutzer beim Import
initializeUsers();
