import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Currencies from './Currencies';
import Rates from './Rates';

function Main() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/gtc/" element={<Home />} />
                    <Route path="/gtc/currencies" element={<Currencies />} />
                    <Route path="/gtc/rates" element={<Rates />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default Main;
