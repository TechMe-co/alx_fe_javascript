/* const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const addQuote = document.getElementById('addQuote');
// const category = document.getElementById('category');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById("newQuoteCategory"); */

/*
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

// Function to create the form for adding a new quote
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
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
document.getElementById('newQuote').addEventListener('click', showRandomQuote);  */

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL

// Initialize quotes array
let quotes = [];

// Fetch quotes from the mock API
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Simulate server data structure
        const newQuotes = data.map(item => ({
            text: item.title, // Using title as a quote
            category: item.userId % 3 === 0 ? 'Inspirational' : item.userId % 2 === 0 ? 'Life' : 'Motivational' // Random categories
        }));

        // Update quotes with server data
        updateQuotes(newQuotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Update quotes with server data
function updateQuotes(newQuotes) {
    let updated = false;
    
    newQuotes.forEach(newQuote => {
        const existingQuote = quotes.find(q => q.text === newQuote.text);
        if (!existingQuote) {
            quotes.push(newQuote); // Add new quote from server
            updated = true;
        }
    });

    if (updated) {
        saveQuotes(); // Save updated quotes to local storage
        notifyUser('New quotes added from server.');
        populateCategories(); // Update categories dropdown
        filterQuotes(); // Refresh displayed quotes
    }
    if (conflicts.length > 0) {
        notifyUser(`Conflict detected for quotes: ${conflicts.join(', ')}`);
    }
}

// Notify user of updates
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = 'lightblue';
    notification.style.padding = '10px';
    notification.style.border = '1px solid #007BFF';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}

// Periodically fetch new quotes
setInterval(fetchQuotesFromServer, 10000); // Fetch every 10 seconds


// Load quotes from local storage on startup
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if none exist
        quotes = [
            { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
            { text: "Life is what happens when you're busy making other plans.", category: "Life" },
            { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Motivational" }
        ];
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Show quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear existing quotes

    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        quoteDisplay.innerHTML += `<div class="quote-item">"${quote.text}" - <em>${quote.category}</em></div>`;
    });

    // Save the last selected category in local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<div class="quote-item">"${quote.text}" - <em>${quote.category}</em></div>`;
    sessionStorage.setItem('lastViewedQuote', quote.text); // Store last viewed quote in session storage
}

// Function to create the form for adding a new quote
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
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
    saveQuotes(); // Save to local storage
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
}

// Function to export quotes to JSON
function exportQuotes() {
    const json = JSON.stringify(quotes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save updated quotes to local storage
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Initialize the application
loadQuotes();
createAddQuoteForm();
populateCategories();
fetchQuotesFromServer(); // Initial fetch

// Restore last selected category filter
const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
document.getElementById('categoryFilter').value = lastSelectedCategory;
filterQuotes(); // Display quotes based on the last selected category