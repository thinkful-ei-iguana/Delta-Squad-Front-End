import React from "react";

const Context = React.createContext({
  currentUser: "",
  hasToken: "",
  isLoggedIn: false,
  recipes: [],
  mealplans: [],
  lightMode: () => { },
  saveAuthToken: () => { },
  getAuthToken: () => { },
  hasAuthToken: () => { },
  makeBasicAuthToken: () => { },
  onLogin: () => { },
  onLogout: () => { }
});

export default Context;
