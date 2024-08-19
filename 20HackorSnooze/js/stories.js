"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  const isFavorite = currentUser && currentUser.isFavorite(story);
  const starType = isFavorite ? "fas" : "far"; // solid for favorite, regular for not

  return $(`
      <li id="${story.storyId}">
        <i class="fa-star ${starType}"></i>
        <button class="btn-delete">Delete</button>
        <a href="${story.url}" target="_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // Loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitNewStory(evt) {
  console.debug("submitNewStory", evt);
  evt.preventDefault();

  // Get the form data
  const title = $("#story-title").val();
  const url = $("#story-url").val();
  const author = $("#story-author").val();

  // Create a story object
  const storyData = { title, url, author };

  // Add the new story using the addStory method from StoryList
  const newStory = await storyList.addStory(currentUser, storyData);

  // Put the new story on the page
  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);

  // Hide the form and reset it
  $("#story-submit-form").hide();
  $("#story-submit-form").trigger("reset");
}

// Attach event listener to the form
$("#story-submit-form").on("submit", submitNewStory);

$allStoriesList.on("click", ".fa-star", async function(evt) {
  console.debug("Toggling favorite", evt);
  const $target = $(evt.target);
  const storyId = $target.closest("li").attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($target.hasClass("fas")) {
    await currentUser.removeFavorite(story);
    $target.removeClass("fas").addClass("far");
  } else {
    await currentUser.addFavorite(story);
    $target.removeClass("far").addClass("fas");
  }
});

$allStoriesList.on("click", ".btn-delete", function(evt) {
  console.debug("Deleting story", evt);
  const $target = $(evt.target);
  const storyId = $target.closest("li").attr("id");

  if (currentUser && currentUser.loginToken) {
    deleteStory(storyId);
  } else {
    alert("You need to be logged in to delete a story.");
  }
});


/** Function to delete a story using Fetch API */
async function deleteStory(storyId) {
  const token = currentUser ? currentUser.loginToken : null;
  if (!token) {
    console.error("No token available. Please log in.");
    alert("Authentication token is missing. Please log in again.");
    return;
  }

  const url = `https://hack-or-snooze-v3.herokuapp.com/stories/${storyId}?token=${token}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Story successfully deleted');
      // Remove the story from the DOM
      removeStoryFromPage(storyId);
    } else {
      const errorData = await response.json();
      console.error('Failed to delete story', errorData);
      alert(`Failed to delete story. Status: ${response.status}. Response: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error('Error in delete request:', error);
    alert(`An error occurred: ${error.message}`);
  }
}

function removeStoryFromPage(storyId) {
  const escapedId = CSS.escape(storyId);
  const storyElement = document.querySelector(`#${escapedId}`);
  if (storyElement) {
    storyElement.remove();
  } else {
    console.error('Story element not found:', storyId);
  }
}



