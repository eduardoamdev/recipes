const chooseYourNavBar = (inside) => {
  if (inside === false) {
    return [
      ["Home", "/", 0],
      ["Sign up", "/signup", 1],
      ["Log in", "/login", 2],
    ];
  } else if (inside === true) {
    return [
      ["Log out", "/logout", 0],
      ["My home", "/session", 1],
      ["Following", "/followed", 2],
      ["Favourites", "/favourites", 3],
      ["Search recipe", "/searchRecipe", 4],
      ["Search user", "/searchUser", 5],
      ["Account settings", "/accountSettings", 6],
    ];
  }
};

export default chooseYourNavBar;
