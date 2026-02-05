import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Currencies from './Currencies';
import Rates from './Rates';
import Calculator from './Calculator';
import Transactions from './Transactions';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function Main() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/gtc/" element={<Home />} />
                    <Route path="/gtc/currencies" element={<Currencies />} />
                    <Route path="/gtc/rates" element={<Rates />} />
                    <Route path="/gtc/calculator" element={<Calculator />} />
                    <Route
                        path="/gtc/transactions"
                        element={
                            <ProtectedRoute>
                                <Transactions />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/gtc/login" element={<Login />} />
                    <Route path="/gtc/register" element={<Register />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default Main;
