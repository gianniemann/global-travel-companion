export const currencies = [
    {
        code: 'CHF',
        name: 'Swiss Franc',
        countries: ['Liechtenstein', 'Switzerland']
    },
    {
        code: 'CZK',
        name: 'Czech Koruna',
        countries: ['Czechia']
    },
    {
        code: 'EUR',
        name: 'Euro',
        countries: ['Austria', 'Belgium', 'France', 'Germany', 'Italy', 'Spain', 'Vatican City']
    },
    {
        code: 'GBP',
        name: 'Pound Sterling',
        countries: ['United Kingdom']
    },
    {
        code: 'SEK',
        name: 'Swedish Krona',
        countries: ['Sweden']
    },
    {
        code: 'TRY',
        name: 'Turkish Lira',
        countries: ['Turkey']
    },
    {
        code: 'USD',
        name: 'United States Dollar',
        countries: ['United States']
    }
];

export const exchangeRates = [
    { from: 'CHF', CHF: 1.000000, EUR: 1.073860, USD: 1.261140, GBP: 0.937044 },
    { from: 'EUR', CHF: 0.931216, EUR: 1.000000, USD: 1.174400, GBP: 0.872591 },
    { from: 'USD', CHF: 0.792932, EUR: 0.851502, USD: 1.000000, GBP: 0.743013 },
    { from: 'GBP', CHF: 1.067190, EUR: 1.146010, USD: 1.345870, GBP: 1.000000 }
];
