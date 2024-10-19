const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency'); 
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "GBP", name: "Pound Sterling" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "ZAR", name: "South African Rand" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "KRW", name: "South Korean Won" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "DKK", name: "Danish Krone" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "THB", name: "Thai Baht" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "ILS", name: "Israeli New Shekel" }
];

// Showing countries from array to select tags
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option'); 

    // Assigning values and text content
    option1.value = option2.value = country.code;
    option1.textContent = `${country.code} (${country.name})`;
    option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1); 
    toCurrencyElement.appendChild(option2);

    // Set defaults
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});

// Get exchange rate from API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    try {
        // Fetch data from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrency]; 

        if (typeof conversionRate === 'undefined') {
            resultElement.textContent = "Exchange rate not available.";
            convertedAmountElement.value = "";
        } else {
            const convertedAmount = amount * conversionRate;
            convertedAmountElement.value = convertedAmount.toFixed(2);
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        }
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        converterContainer.innerHTML = '<h2>Error while fetching exchange rates!!!!</h2>';
    }
};

// Add event listeners
fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);






