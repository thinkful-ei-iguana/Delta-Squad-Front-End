import React from "react";
import { Link } from "react-router-dom";
import config from "../config";


export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipeSearch: null };
  }

  componentDidMount() {
    fetch(
      `${config.API_ENDPOINT}recipes/${
      this.props.location.pathname.split("/")[2]
      }`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ recipeSearch: json });
      });
  }
  render() {
    return (
      <div className="Landing">
        <Link to="/home">Home</Link>
        <header id="Landing-Header">
          <form id="SearchForm">
            <label className="field a-field a-field_a2">
              <span className="a-field__label-wrap">
                <span className="a-field__label">Searched results</span>
              </span>
            </label>
          </form>
        </header>
        {this.state.recipeSearch ? (
          <>
            <h1>{this.state.recipeSearch.title}</h1>
            <p>{this.state.recipeSearch.recipe_description}</p>
            <p>{this.state.recipeSearch.recipe_ingredients}</p>
            <p>{this.state.recipeSearch.time_to_make}</p>
          </>
        ) : (
            "I'm sorry I can't find that."
          )}
      </div>
    );
  }
}
