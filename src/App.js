import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginRoute from "./Routes/LoginRoute";
import RegistrationRoute from "./Routes/RegistrationRoute";
import DashboardRoute from "./Routes/DashboardRoute";
import PrivateRoute from "./Components/PrivateOnly/PrivateRoute";
import PublicOnlyRoute from "./Components/PublicOnly/PublicOnlyRoute";
import RecipesRoute from "./Routes/RecipesRoute";
import PantryRoute from "./Routes/PantryRoute";
import PlannerRoute from "./Routes/PlannerRoute";
import MealPlan from "./Components/Planner/MealPlan";
import NotFoundRoute from "./Routes/NotFoundRoute";
import Darkmode from "darkmode-js";
import Header from "./Components/Header/Header";
import Landing from "./Routes/LandingPage/LandingPage";
import searchRecipes from "./Components/Recipes/Search-Recipe";
import individualRecipe from "./Components/Recipes/Individual-Recipe";
import editRecipe from "./Components/Recipes/Edit-Recipe";
import createRecipes from "./Components/Recipes/Create-Recipe";
import viewSearchRecipes from "./Components/Recipes/View-Search";

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
      recipes: [],
      hasError: false
    };
  }

  render() {
    const darkmode = new Darkmode(options);
    darkmode.showWidget();

    return (
      <div className="App">
        <main>
          <Header user={this.state.currentUser} />
          <Switch>
            <PrivateRoute
              exact
              path={"/home"}
              component={DashboardRoute}
            />
            <PrivateRoute
              exact
              path={"/recipes"}
              component={RecipesRoute}
            />
            <PrivateRoute
              exact
              path={"/recipes/search"}
              component={searchRecipes}
            />
            <PrivateRoute
              exact
              path={"/recipes/create"}
              component={createRecipes}
            />
            <PrivateRoute
              exact
              path={"/recipes/:recipeId"}
              component={individualRecipe}
            />
            <PrivateRoute
              exact
              path={"/edit-recipe/:recipeId"}
              component={editRecipe}
            />
            <PrivateRoute
              exact
              path={"/recipes/search/:recipeId"}
              component={viewSearchRecipes}
            />
            <PrivateRoute
              exact
              path={"/pantry"}
              component={PantryRoute}
            />
            <PrivateRoute
              exact
              path={"/planner"}
              component={PlannerRoute}
            />
            <PrivateRoute
              exact
              path={"/planner/:mealPlanId"}
              component={MealPlan}
            />
            <PublicOnlyRoute
              exact
              path={"/"}
              component={Landing}
            />
            <PublicOnlyRoute
              exact
              path={"/register"}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              exact
              path={"/login"}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
