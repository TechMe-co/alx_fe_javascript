/* const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const addQuote = document.getElementById('addQuote');
// const category = document.getElementById('category');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById("newQuoteCategory"); */


// Array to hold quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Motivational" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<div class="quote-item">"${quote.text}" - <em>${quote.category}</em></div>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (!newQuoteText || !newQuoteCategory) {
        alert('Please enter both a quote and a category.');
        return;
    }

    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
}

// Event listener for showing a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);