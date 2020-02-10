import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import NavMenu from "../src/Components/Nav-Menu";
import Landing from "../src/Components/Landing";
import AccountCreation from "../src/Components/Account-Creation";
import AccountLogin from "../src/Components/Account-Login";
import SearchResults from "../src/Components/Search-Results";
import Home from "../src/Components/Home";
import AuthHelper from "../src/Helpers/Auth";
import Context from "../src/Components/Context";
import config from "./config";
import CreateRecipe from "../src/Components/Create-Recipe";
import EditRecipe from "../src/Components/Edit-Recipe";
import Profile from "../src/Components/Profile";
import Darkmode from "darkmode-js";
import DetailedView from "../src/Components/Detailed-View";

const options = {
  bottom: "64px", // default: '32px'
  right: "32px",
  left: "unset",
  time: "0.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: false, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true // default: true
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isLoggedIn: false,
      hasToken: this.hasAuthToken(),
      recipes: []
    };
  }

  componentDidMount() {
    if (this.hasAuthToken()) {
      AuthHelper.getCurrentUser(this.getAuthToken()).then(data =>
        this.setState(prevState => ({
          currentUser: data,
          isLoggedIn: true
        }))
      );
    }
    fetch("http://localhost:8000/api/recipes")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ recipes: data });
      });
  }

  saveAuthToken = token => {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  };
  getAuthToken = () => {
    return window.localStorage.getItem(config.TOKEN_KEY);
  };
  hasAuthToken = () => {
    return !!this.getAuthToken();
  };
  makeBasicAuthToken = (userName, password) => {
    return window.btoa(`${userName}:${password}`);
  };

  onLogin = () => {
    AuthHelper.getCurrentUser(this.getAuthToken()).then(
      data =>
        (this.setState = () => ({
          currentUser: data,
          isLoggedIn: true
        }))
    );
  };

  onLogout = () => {
    window.localStorage.removeItem(config.TOKEN_KEY);
    this.setState({ currentUser: {}, isLoggedIn: false });
  };

  render() {
    const darkmode = new Darkmode(options);
    darkmode.showWidget();
    return (
      <Context.Provider
        value={{
          currentUser: this.state.currentUser,
          hasToken: this.state.hasToken,
          isLoggedIn: this.state.isLoggedIn,
          saveAuthToken: this.saveAuthToken,
          getAuthToken: this.getAuthToken,
          hasAuthToken: this.hasAuthToken,
          makeBasicAuthToken: this.makeBasicAuthToken,
          recipes: this.state.recipes,
          onLogin: this.onLogin,
          onLogout: this.onLogout
        }}
      >
        {" "}
        <div className="App">
          <Router>
            <Route
              exact
              path="/"
              render={routeProps => {
                return (
                  <>
                    <NavMenu {...routeProps} />
                    <Landing {...routeProps} />
                  </>
                );
              }}
            />
            <Route
              exact
              path="/Home"
              render={routeProps => {
                return <Home {...routeProps} />;
              }}
            />
            <Route
              exact
              path="/Login"
              render={routeProps => {
                return <AccountLogin {...routeProps} />;
              }}
            />
            <Route
              exact
              path="/Create-Account"
              render={routeProps => {
                return <AccountCreation {...routeProps} />;
              }}
            />
            {/* <Route
              exact
              path="/Edit-Account"
              render={routeProps => {
                return <EditAccount {...routeProps} />;
              }}
            /> */}
            <Route
              exact
              path="/user/:username"
              render={routeProps => {
                return <Profile {...routeProps} />;
              }}
            />
            <Route
              exact
              path="/search/:searchterm"
              render={routeProps => {
                return <SearchResults {...routeProps} />;
              }}
            />
            <Route
              path="/Create-Recipe"
              render={routeProps => {
                return <CreateRecipe {...routeProps} />;
              }}
            />
            <Route
              path="/recipe/:recipeid"
              render={routeProps => {
                return <DetailedView {...routeProps} />;
              }}
            />
            <Route
              exact
              path="/Edit-Recipe/:recipeid"
              render={routeProps => {
                return <EditRecipe {...routeProps} />;
              }}
            />
          </Router>
        </div>
      </Context.Provider>
    );
  }
}
console.log("First commit!");
export default App;
