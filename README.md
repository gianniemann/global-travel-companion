# Global Travel Companion (GTC)

Autor: Gian
Modul: Web Engineering II
Schuljahr: 2025/2026

---

## Voraussetzungen

| Software | Version  |
|----------|----------|
| Node.js  | v24.13.0 |
| npm      | (mit Node) |
| MySQL    | 8+       |

---

## Datenbank einrichten

1. MySQL starten
2. In MySQL Workbench oder CLI einloggen
3. SQL-Script ausfuhren:

```
db/db.sql
```

Die Datenbank heisst nach dem Import `gtc`.

---

## Konfiguration Backend

Die Datei `backend/.env` enthalt die Datenbankverbindung:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ibw2024
DB_NAME=gtc
PORT=3001
```

Werte bei Bedarf anpassen.

---

## Installation

### Frontend

```bash
npm install
npm run dev
```

Lauft auf: http://localhost:3000

### Backend

```bash
cd backend
npm install
npm run dev
```

Lauft auf: http://localhost:3001

---

## Reihenfolge beim Starten

1. MySQL starten
2. Backend starten (`cd backend && npm run dev`)
3. Frontend starten (`npm run dev`)
4. Browser offnen: http://localhost:3000/gtc/

---

## Demo-Login

| Benutzername | Passwort |
|--------------|----------|
| max          | password |

Neue Benutzer konnen uber die Registrierungsseite erstellt werden.

---

## Projektstruktur

```
global-travel-companion/
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── .env
├── db/
│   └── db.sql
├── src/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── config.js
└── README.md
```
