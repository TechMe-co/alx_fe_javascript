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

/* 
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

async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newQuote.text,
                userId: newQuote.category === 'Inspirational' ? 1 : newQuote.category === 'Life' ? 2 : 3 // Simulated user ID
            })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();
        console.log('Quote posted successfully:', responseData);
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}
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
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (!newQuoteText || !newQuoteCategory) {
        alert('Please enter both a quote and a category.');
        return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    
    quotes.push(newQuote); // Add the new quote to local array
    await postQuoteToServer(newQuote); // Post quote to server
    saveQuotes(); // Save updated quotes to local storage
    populateCategories(); // Update categories dropdown
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
        populateCategories();
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
filterQuotes(); // Display quotes based on the last selected category */

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL

// Initialize quotes array
let quotes = [];

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
    let conflicts = [];

    newQuotes.forEach(newQuote => {
        const existingQuote = quotes.find(q => q.text === newQuote.text);
        if (!existingQuote) {
            quotes.push(newQuote); // Add new quote from server
            updated = true;
        } else {
            conflicts.push(newQuote.text);
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

// Sync local quotes with server quotes
async function syncQuotes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Simulate server data structure
        const serverQuotes = data.map(item => ({
            text: item.title,
            category: item.userId % 3 === 0 ? 'Inspirational' : item.userId % 2 === 0 ? 'Life' : 'Motivational'
        }));

        // Compare with local quotes and resolve conflicts
        serverQuotes.forEach(serverQuote => {
            const existingQuote = quotes.find(q => q.text === serverQuote.text);
            if (!existingQuote) {
                quotes.push(serverQuote); // Add new quote from server
            } else if (existingQuote.category !== serverQuote.category) {
                // Conflict detected: Keep the server's quote
                const index = quotes.indexOf(existingQuote);
                quotes[index] = serverQuote; // Update with server data
            }
        });

        saveQuotes(); // Save all quotes after syncing
        notifyUser('Quotes synchronized with server.');
        populateCategories(); // Update categories dropdown
        filterQuotes(); // Refresh displayed quotes
    } catch (error) {
        console.error('Error syncing quotes:', error);
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

// Periodically fetch new quotes and sync
setInterval(syncQuotes, 10000); // Sync every 10 seconds

// Function to post a new quote to the mock API
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newQuote.text,
                userId: newQuote.category === 'Inspirational' ? 1 : newQuote.category === 'Life' ? 2 : 3 // Simulated user ID
            })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();
        console.log('Quote posted successfully:', responseData);
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<div class="quote-item">"${quote.text}" - <em>${quote.category}</em></div>`;
    sessionStorage.setItem('lastViewedQuote', quote.text);
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
    addButton.onclick = async () => {
        await addQuote();
    };

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// Function to add a new quote
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (!newQuoteText || !newQuoteCategory) {
        alert('Please enter both a quote and a category.');
        return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    
    quotes.push(newQuote); // Add the new quote to local array
    await postQuoteToServer(newQuote); // Post quote to server
    saveQuotes(); // Save updated quotes to local storage
    populateCategories(); // Update categories dropdown
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
        populateCategories(); // Update categories dropdown
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
populateCategories();
createAddQuoteForm();
fetchQuotesFromServer(); // Initial fetch