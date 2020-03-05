import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../Helpers/Recipe";
import './Create-Recipe.css'


export default class CreateRecipe extends React.Component {
  static defaultProps = {
    currentUser: {},
    location: {},
    history: {
      push: () => { }
    }
  };

  handleCreationSuccess = () => {
    const { history } = this.props;
    history.push("/recipes");
  };

  state = { error: null };

  createSubmit = e => {
    e.preventDefault();
    const {
      title,
      recipe_description,
      recipe_ingredients,
      time_to_make
    } = e.target;

    this.setState({ error: null });
    let recipeIngredients = recipe_ingredients.value.split(', ');

    Recipe.createRecipe({
      title: title.value,
      recipe_description: recipe_description.value.split('. '),
      recipe_ingredients: recipeIngredients,
      time_to_make: time_to_make.value,
    })
      .then(res => {
        if (!res.ok) { this.setState({ error: !res.ok }) }
        else {
          title.value = "";
          recipe_description.value = "";
          recipe_ingredients.value = "";
          time_to_make.value = "";
          this.handleCreationSuccess();
        }
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    let error = this.state.error;
    return (

      <div className="Creation">
        <header className="Creation-Header" id="add-recipe-header">
          New Recipe
        </header>
        <form className="Creation-Form" onSubmit={this.createSubmit}>
          {error && <p className="empty-fields-error-message">Fields cannot be empty. Please try again.</p>}

          <label className="field a-field a-field_a2">
            Title
            <input
              className="field__input a-field__input"
              required
              name="title"
              placeholder="Title"
            />
            <span className="a-field__label-wrap"><span className="a-field__label"></span></span>
          </label>
          <label className="field a-field a-field_a2">
            Ingredients <div className="inputParam">(separate by commas)</div>
            <input
              className="field__input a-field__input"
              required
              type="text"
              maxLength="60"
              name="recipe_ingredients"
              placeholder="Recipe ingredients"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            Instructions <div className="inputParam">(separate by period)</div> <textarea
              className="field__input a-field__input instructionsField"
              required
              type="text"
              maxLength="300"
              name="recipe_description"
              placeholder="Recipe description"
            ></textarea>
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>

          <label className="field a-field a-field_a2">
            Total Prep Time <div className="inputParam">(in minutes)</div>
            <input
              className="field__input a-field__input"
              required
              type="number"
              min="1"
              name="time_to_make"
              placeholder="Time to make the recipe"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <div className="btn-row">
            <div>
              <button className="medButton" type="submit">Create recipe</button>
            </div>
            <Link to="/recipes">
              <button className="medButton">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
