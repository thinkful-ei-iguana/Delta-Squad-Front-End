import React from "react";

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
        let URL =  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerms}&apiKey=baa0b2cbf1a547a9addbdc0c04fe5037`

        fetch(URL)
        .then(res => {
          if (!res.ok) {
            throw new Error (res.statusText);
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
        return (
                this.state.searchResults.map(recipe => <li id={recipe.id}>{recipe.title}</li>);
        )
    }

    render () {
        return(
            <div className="searchRecipe">
                <form onSubmit={this.handleSearch}>
                    <input type="text" onChange={e => this.setState({searchTerms: e.target.value})}></input>
                    <button type="submit">Search</button>
                </form>

                <section className="recipeResults">
                    <h3>Results:</h3>

                </section>

            </div>
        )
    }

}