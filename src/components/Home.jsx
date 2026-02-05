function Home() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Willkommen beim Global Travel Companion</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Über diese Applikation</h5>
                            <p className="card-text">
                                Der Global Travel Companion (GTC) ist Ihre zentrale Anlaufstelle für
                                Informationen zu Währungen und Devisenkursen weltweit. Diese Webapplikation
                                wurde entwickelt, um Reisenden und Geschäftsleuten schnellen Zugriff auf
                                aktuelle Währungsinformationen zu bieten.
                            </p>
                            <h6 className="mt-4">Funktionen:</h6>
                            <ul>
                                <li><strong>Currencies:</strong> Übersicht über verschiedene Währungen mit
                                    ISO-Codes und den Ländern, in denen sie verwendet werden</li>
                                <li><strong>Exchange Rates:</strong> Aktuelle Devisenkurse für die wichtigsten
                                    Währungen im Überblick</li>
                            </ul>
                            <p className="card-text mt-3">
                                Navigieren Sie über das Menü zu den gewünschten Informationen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
