"use strict";

// Global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */
async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  const username = $("#login-username").val();
  const password = $("#login-password").val();

  try {
    currentUser = await User.login(username, password);
    console.debug("Logged in user:", currentUser);
    $loginForm.trigger("reset");
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
  } catch (error) {
    console.error("Login error:", error);
  }
}

$loginForm.on("submit", login);

/** Handle signup form submission. */
async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  try {
    currentUser = await User.signup(username, password, name);
    console.debug("Signed up user:", currentUser);
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
    $signupForm.trigger("reset");
  } catch (error) {
    console.error("Signup error:", error);
  }
}

$signupForm.on("submit", signup);

/** Handle click of logout button */
function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in */
async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  try {
    currentUser = await User.loginViaStoredCredentials(token, username);
    console.debug("Remembered user:", currentUser);
  } catch (error) {
    console.error("Remembered user login error:", error);
  }
}

/** Sync current user information to localStorage. */
function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or logs in, update the UI */
function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $allStoriesList.show();
  updateNavOnLogin();
}

function updateNavOnLogin() {
  // Ensure this function updates the nav as needed for logged-in users
  $navLogin.hide();
  $navLogOut.show();
  $("#nav-favorites").show();
}
