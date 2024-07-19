//Find User By Username
function findUserByUsername(users, username) {
    return users.find(function(user) {
      return user.username === username;
    });
  }
  //Remove User
  function removeUser(users, username) {
    const index = users.findIndex(function(user) {
      return user.username === username;
    });
    if (index === -1) return undefined;
    return users.splice(index, 1)[0];
  }