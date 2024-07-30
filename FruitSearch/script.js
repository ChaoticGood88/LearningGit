// Select the input field and the suggestions list
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

// List of fruits to search from
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// Function to handle the input event and perform the search
function searchHandler(e) {
    const query = input.value.trim().toLowerCase(); // Get the input value and convert to lowercase
    if (query === '') {
        suggestions.innerHTML = ''; // Clear suggestions if input is empty
        return;
    }
    const results = search(query); // Call search function with the input value
    showSuggestions(results, query); // Display the search results
}

// Function to search the fruit list for matching entries
function search(str) {
    return fruit.filter(fruitName => fruitName.toLowerCase().includes(str)); // Filter fruit list based on input string
}

// Function to display the search results as a dropdown
function showSuggestions(results, inputVal) {
    suggestions.innerHTML = ''; // Clear previous suggestions

    // Add new suggestions to the list
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        suggestions.appendChild(li);

        // Add event listeners to highlight suggestion on hover
        li.addEventListener('mouseenter', () => li.classList.add('highlight'));
        li.addEventListener('mouseleave', () => li.classList.remove('highlight'));
    });
}

// Function to populate the input field with the selected suggestion
function useSuggestion(e) {
    if (e.target.tagName === 'LI') {
        input.value = e.target.textContent; // Set input value to the selected suggestion
        suggestions.innerHTML = '';         // Clear suggestions after selection
    }
}

// Add event listeners
input.addEventListener('input', searchHandler);  // Listen for input events to trigger search
suggestions.addEventListener('click', useSuggestion); // Listen for clicks on suggestions


