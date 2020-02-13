import React from "react";
import config from "../config";
// import Recipe from "./Recipe";
import UserContext from "../Contexts/UserContext";
import TokenService from "../Helpers/Token";
import "../Styles/Recipe.css";

export default class RecentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  static contextType = UserContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/recipes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(recipesRes => this.setState({ recipes: recipesRes }));
    console.log(this.state.recipes);
  }

  render() {
    // console.log('this.context.user is', this.context.user);
    return (
      <div className="RecentResults">
        {/* <section className="flex-container">
          {this.state.recipes.map(recipe => (
            <Recipe key={recipe.id} {...recipe} />
          ))}
        </section> */}
      </div>
    );
  }
}
