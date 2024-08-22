"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $("#story-submit-form"),
    $(".favorites-container")
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();

  // Attach event listener to favorite icons
  $allStoriesList.on("click", ".star-icon", toggleStoryFavorite);
}

// Function to handle favorite/unfavorite a story
async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $target = $(evt.target);
  const storyId = $target.closest("li").attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if (!$target.hasClass("fas")) {
    // Add to favorites
    try {
      await axios.post(`https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${storyId}`, 
        { token: currentUser.loginToken });
      await currentUser.addFavorite(story);
      $target.toggleClass("fas far");
    } catch (err) {
      console.error("Error adding favorite", err);
      alert("Could not add to favorites. Please try again.");
    }
  } else {
    // Remove from favorites
    try {
      await axios.delete(`https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${storyId}`, 
        { headers: { Authorization: `Bearer ${currentUser.loginToken}` } });
      await currentUser.removeFavorite(story);
      $target.toggleClass("fas far");
    } catch (err) {
      console.error("Error removing favorite", err);
      alert("Could not remove from favorites. Please try again.");
    }
  }
}


/** Update the UI when a user logs in */
function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  // Show user profile and logout links
  $navUserProfile.text(`Welcome, ${currentUser.name}`);
  $navLogin.hide();
  $navLogOut.show();
  
  // Show the favorites link in the navigation bar
  $("#nav-favorites").show();

  // Attach event listeners for the favorites link
  $("#nav-favorites").on("click", showFavorites);

  // Show the initial stories and update favorites
  getAndShowStoriesOnStart();
}

/** Show the user's favorite stories */
async function showFavorites() {
  console.debug("showFavorites");

  hidePageComponents();

  // Show the favorites container
  $(".favorites-container").show();

  // Populate the favorites list
  const $favoritesList = $("#favorite-stories-list");
  $favoritesList.empty(); // Clear the list first

  if (currentUser.favorites.length === 0) {
    $favoritesList.append("<li>No favorite stories yet!</li>");
  } else {
    currentUser.favorites.forEach(story => {
      $favoritesList.append(createStoryHTML(story, true));
    });
  }
}

/** Create HTML for a story */
function createStoryHTML(story, isFavorite = false) {
  console.debug("createStoryHTML");

  const hostName = story.getHostName();
  const favoriteClass = isFavorite ? "fas" : "far";

  return `
    <li id="${story.storyId}">
      <a href="${story.url}" target="_blank" class="story-link">${story.title}</a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
      <i class="star-icon ${favoriteClass} fa-star"></i> <!-- Favorite icon -->
    </li>`;
}

/** Display all stories on start */
async function getAndShowStoriesOnStart() {
  console.debug("getAndShowStoriesOnStart");

  // Hide the loading message
  $storiesLoadingMsg.remove();

  // Fetch stories
  storyList = await StoryList.getStories();

  // Show all stories
  $allStoriesList.empty();
  storyList.stories.forEach(story => {
    const isFavorite = currentUser && currentUser.isFavorite(story);
    $allStoriesList.append(createStoryHTML(story, isFavorite));
  });

  // Show the all stories list
  $allStoriesList.show();
}

// Once the DOM is entirely loaded, begin the app
console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);

