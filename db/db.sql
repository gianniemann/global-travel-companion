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
