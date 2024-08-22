"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show submit story form on click on "submit" */
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $("#story-submit-form").show(); // Show the form
}

$body.on("click", "#nav-submit", navSubmitClick);

/** Show the user's favorites when clicking on "favorites" */
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  showFavorites(); // Show the user's favorite stories
}

$body.on("click", "#nav-favorites", navFavoritesClick);

/** When a user first logs in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  hidePageComponents();
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`Welcome, ${currentUser.username}`).show();
  $("#nav-favorites").show(); // Show the favorites link
}

/** When the user logs out, update the navbar */
function updateNavOnLogout() {
  console.debug("updateNavOnLogout");
  $(".main-nav-links").hide();
  hidePageComponents();
  $navLogin.show();
  $navLogOut.hide();
  $navUserProfile.hide();
  $("#nav-favorites").hide(); // Hide the favorites link
}

$body.on("click", "#nav-logout", function(evt) {
  console.debug("navLogoutClick", evt);
  currentUser = null; // Clear current user
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  updateNavOnLogout();
  hidePageComponents();
  putStoriesOnPage(); // Show the list of all stories
});

