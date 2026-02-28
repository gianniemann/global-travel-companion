CREATE DATABASE IF NOT EXISTS gtc;
USE gtc;

CREATE TABLE user (
                      id         INT AUTO_INCREMENT PRIMARY KEY,
                      firstName  VARCHAR(100) NOT NULL,
                      lastName   VARCHAR(100) NOT NULL,
                      username   VARCHAR(50)  NOT NULL UNIQUE,
                      password   VARCHAR(255) NOT NULL
);

CREATE TABLE currency (
                          id    INT AUTO_INCREMENT PRIMARY KEY,
                          code  VARCHAR(10)  NOT NULL UNIQUE,
                          name  VARCHAR(100) NOT NULL
);

CREATE TABLE rate (
                      id           INT AUTO_INCREMENT PRIMARY KEY,
                      fromCurrency VARCHAR(10)    NOT NULL,
                      toCurrency   VARCHAR(10)    NOT NULL,
                      rate         DECIMAL(15, 6) NOT NULL,
                      FOREIGN KEY (fromCurrency) REFERENCES currency(code),
                      FOREIGN KEY (toCurrency)   REFERENCES currency(code)
);

CREATE TABLE transaction (
                             id             INT AUTO_INCREMENT PRIMARY KEY,
                             username       VARCHAR(50)    NOT NULL,
                             sourceAmount   DECIMAL(15, 2) NOT NULL,
                             sourceCurrency VARCHAR(10)    NOT NULL,
                             targetCurrency VARCHAR(10)    NOT NULL,
                             exchangeRate   DECIMAL(15, 6) NOT NULL,
                             targetAmount   DECIMAL(15, 2) NOT NULL,
                             date           DATETIME DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (username)       REFERENCES user(username),
                             FOREIGN KEY (sourceCurrency) REFERENCES currency(code),
                             FOREIGN KEY (targetCurrency) REFERENCES currency(code)
);

-- Seed: Währungen
INSERT INTO currency (code, name) VALUES
                                      ('CHF', 'Schweizer Franken'),
                                      ('EUR', 'Euro'),
                                      ('USD', 'US-Dollar'),
                                      ('GBP', 'Britisches Pfund');

-- Seed: Wechselkurse (aus deinem currencyData.js übernommen)
INSERT INTO rate (fromCurrency, toCurrency, rate) VALUES
                                                      ('CHF', 'EUR', 1.073860),
                                                      ('CHF', 'USD', 1.131940),
                                                      ('CHF', 'GBP', 0.895820),
                                                      ('CHF', 'CHF', 1.000000),
                                                      ('EUR', 'CHF', 0.931200),
                                                      ('EUR', 'USD', 1.054100),
                                                      ('EUR', 'GBP', 0.834500),
                                                      ('EUR', 'EUR', 1.000000),
                                                      ('USD', 'CHF', 0.883500),
                                                      ('USD', 'EUR', 0.948700),
                                                      ('USD', 'GBP', 0.791300),
                                                      ('USD', 'USD', 1.000000),
                                                      ('GBP', 'CHF', 1.115800),
                                                      ('GBP', 'EUR', 1.198200),
                                                      ('GBP', 'USD', 1.263900),
                                                      ('GBP', 'GBP', 1.000000);

-- Seed: Demo-User (Passwort: password)
INSERT INTO user (firstName, lastName, username, password) VALUES
                                                               ('Max',  'Mustermann', 'max',  'password'),
                                                               ('Anna', 'Schmidt',    'anna', 'password');


USE gtc;

-- Bestehende Währungen aktualisieren (Namen auf Englisch + Länder)
UPDATE currency SET name = 'Swiss Franc',            countries = 'Liechtenstein, Switzerland'                              WHERE code = 'CHF';
UPDATE currency SET name = 'Euro',                   countries = 'Austria, Belgium, France, Germany, Italy, Spain, Vatican City' WHERE code = 'EUR';
UPDATE currency SET name = 'Pound Sterling',         countries = 'United Kingdom'                                          WHERE code = 'GBP';
UPDATE currency SET name = 'United States Dollar',   countries = 'United States'                                           WHERE code = 'USD';

-- Neue Währungen hinzufügen
INSERT INTO currency (code, name, countries) VALUES
                                                 ('CZK', 'Czech Koruna',   'Czechia'),
                                                 ('SEK', 'Swedish Krona',  'Sweden'),
                                                 ('TRY', 'Turkish Lira',   'Turkey');


USE gtc;

SET SQL_SAFE_UPDATES = 0;
-- Alle bestehenden Kurse löschen und neu setzen (inkl. neuer Währungen)
DELETE FROM rate;

INSERT INTO rate (fromCurrency, toCurrency, rate) VALUES
-- CHF als Basis
('CHF', 'CHF', 1.000000),
('CHF', 'EUR', 1.073860),
('CHF', 'USD', 1.274100),
('CHF', 'GBP', 0.935700),
('CHF', 'CZK', 26.079000),
('CHF', 'SEK', 11.748000),
('CHF', 'TRY', 55.740000),

-- EUR als Basis
('EUR', 'EUR', 1.000000),
('EUR', 'CHF', 0.931200),
('EUR', 'USD', 1.186200),
('EUR', 'GBP', 0.871600),
('EUR', 'CZK', 24.263000),
('EUR', 'SEK', 10.943000),
('EUR', 'TRY', 51.884300),

-- USD als Basis
('USD', 'USD', 1.000000),
('USD', 'CHF', 0.785300),
('USD', 'EUR', 0.843000),
('USD', 'GBP', 0.734700),
('USD', 'CZK', 20.453000),
('USD', 'SEK', 9.226000),
('USD', 'TRY', 43.742000),

-- GBP als Basis
('GBP', 'GBP', 1.000000),
('GBP', 'CHF', 1.068300),
('GBP', 'EUR', 1.147100),
('GBP', 'USD', 1.361200),
('GBP', 'CZK', 27.836000),
('GBP', 'SEK', 12.556000),
('GBP', 'TRY', 59.527000),

-- CZK als Basis
('CZK', 'CZK', 1.000000),
('CZK', 'CHF', 0.038350),
('CZK', 'EUR', 0.041216),
('CZK', 'USD', 0.048900),
('CZK', 'GBP', 0.035920),
('CZK', 'SEK', 0.451000),
('CZK', 'TRY', 2.139000),

-- SEK als Basis
('SEK', 'SEK', 1.000000),
('SEK', 'CHF', 0.085120),
('SEK', 'EUR', 0.091390),
('SEK', 'USD', 0.108400),
('SEK', 'GBP', 0.079640),
('SEK', 'CZK', 2.217000),
('SEK', 'TRY', 4.743000),

-- TRY als Basis
('TRY', 'TRY', 1.000000),
('TRY', 'CHF', 0.017940),
('TRY', 'EUR', 0.019273),
('TRY', 'USD', 0.022860),
('TRY', 'GBP', 0.016800),
('TRY', 'CZK', 0.467500),
('TRY', 'SEK', 0.210900);