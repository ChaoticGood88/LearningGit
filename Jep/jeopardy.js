const NUM_CATEGORIES = 6; 
const NUM_QUESTIONS_PER_CAT = 5; 

const API_LINKS = [
    "https://opentdb.com/api.php?amount=5&category=15&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=16&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=27&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=20&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=9&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=11&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=14&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=17&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=22&type=multiple",
    'https://opentdb.com/api.php?amount=5&category=23&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=12&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=26&type=multiple'
];

let categories = [];

/** Get NUM_CATEGORIES random category URLs from the API_LINKS. */
function getRandomApiLinks() {
    return _.sampleSize(API_LINKS, NUM_CATEGORIES);
}

/** Fetch data from a single category API URL with retry logic. */
async function fetchWithRetry(url, retries = 3, delay = 5000) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
            console.warn(`Rate limit hit, retrying after ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
        } else {
            throw error;
        }
    }
}

/** Fetch category data and format it. */
async function getCategory(apiLink) {
    const data = await fetchWithRetry(apiLink);

    const clues = data.results.map(clue => ({
        question: clue.question,
        answer: clue.correct_answer,
        showing: null,
    }));

    return {
        title: data.results[0].category,
        clues,
    };
}

/** Fill the HTML table#jeopardy with categories & cells for questions. */
async function fillTable() {
    const $thead = $('#jeopardy thead');
    const $tbody = $('#jeopardy tbody');

    $thead.empty();
    $tbody.empty();

    // Create header row with category titles
    const $tr = $('<tr>');
    for (let category of categories) {
        $tr.append($('<th>').text(category.title));
    }
    $thead.append($tr);

    // Create question rows
    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
        const $tr = $('<tr>');
        for (let category of categories) {
            $tr.append($('<td>')
                .attr('data-cat-id', category.title)
                .attr('data-clue-id', i)
                .text('?'));
        }
        $tbody.append($tr);
    }
}

/** Handle clicking on a clue: show the question or answer. */
function handleClick(evt) {
    const $cell = $(evt.target);
    const catId = $cell.data('cat-id');
    const clueId = $cell.data('clue-id');

    const category = categories.find(cat => cat.title === catId);
    if (!category) return;
    
    const clue = category.clues[clueId];
    if (!clue) return;

    if (clue.showing === null) {
        $cell.html(clue.question);
        clue.showing = "question";
    } else if (clue.showing === "question") {
        $cell.html(clue.answer);
        clue.showing = "answer";
    }
}

/** Show loading view. */
function showLoadingView() {
    $('#jeopardy').hide();
    $('#loading').show();
}

/** Hide loading view. */
function hideLoadingView() {
    $('#loading').hide();
    $('#jeopardy').show();
}

/** Start game: fetch data and fill the table. */
async function setupAndStart() {
    showLoadingView();
    try {
        const selectedLinks = getRandomApiLinks();
        categories = [];
        for (let link of selectedLinks) {
            categories.push(await getCategory(link));
        }
        await fillTable();
    } catch (error) {
        showError('An error occurred. Please try again.');
    } finally {
        hideLoadingView();
    }
}

/** Display error message. */
function showError(message) {
    alert(message); // You can update this to show an error message in the UI if preferred
}

// Set up event handlers
$('#start').on('click', setupAndStart);
$(document).ready(function () {
    $('#jeopardy').on('click', 'td', handleClick);
});


