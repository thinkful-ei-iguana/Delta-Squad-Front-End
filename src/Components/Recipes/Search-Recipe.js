import React from "react";
import './Search-Recipe.css';
import { Link } from "react-router-dom";

export default class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: '',
      searchResults: []
    };
  }

  handleSearch = (event) => {
    event.preventDefault();
    let searchArray = this.state.searchTerms.split(' ')
    let searchTerms = searchArray.join(',+')
    let URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerms}&apiKey=baa0b2cbf1a547a9addbdc0c04fe5037`

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(results => {
        this.setState({
          searchResults: results,
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry could not find that',
        });
      })
  }

  displaySearchResults = () => {
    if (this.state.searchResults.length === 0) {
      return;
    }
    else {
      return (
        <div>
          <h2 id="results">Results:</h2>
          {this.state.searchResults.map(recipe => <li key={recipe.id}>
            <Link className="individualResult"
              to={{
                pathname: `/recipes/search/${recipe.id}`,
                state: {
                  recipeId: recipe.id
                }
              }}>
              {recipe.title}
            </Link>
          </li>)}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="searchRecipe">
        <p id="larger-search-text">Search our collection of recipes!</p>
        <p id="recipe-search-text">
          For best results, please use whole words as search terms. <br />Feel free to include more than one search term at a time.
        </p>
        <br />
        <form className="searchArea" onSubmit={this.handleSearch}>
          <input id="searchBar" type="text" placeholder="Search by ingredients" onChange={e => this.setState({ searchTerms: e.target.value })}></input>
          <button id="searchButton" type="submit">Search</button>
        </form>

        <section className="recipeResults">
          {this.displaySearchResults()}

        </section>

      </div>
    )
  }

}