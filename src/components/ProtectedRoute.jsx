import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();

    // Wenn nicht eingeloggt, zur Login-Seite umleiten
    if (!isLoggedIn) {
        return <Navigate to="/gtc/login" replace />;
    }

    // Wenn eingeloggt, Komponente anzeigen
    return children;
}

export default ProtectedRoute;
