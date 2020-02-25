import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../Helpers/Recipe";
import Context from "../../Contexts/Context";
import RecipeHelper from "../../Helpers/Recipe";
import "../../Styles/Buttons.css";
export default class CreateRecipe extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }

  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push("/Login");
    }
    RecipeHelper.recipeById(this.props.match.params.recipeid).then(data => {
      this.setState({ recipe: data });
    });
  }

  ownerCheck = () => {
    if (this.context.currentUser.id !== this.state.recipe.owner) {
      return this.nonOwner();
    } else {
      return this.owner();
    }
  };

  handleEditSuccess = () => {
    const { history } = this.props;
    history.push("/");
  };

  editSubmit = ev => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const recipe_description = ev.target.recipe_description.value;
    const recipe_ingredients = ev.target.recipe_ingredients.value;
    const time_to_make = ev.target.time_to_make.value;

    this.setState({ error: null });
    Recipe.updateRecipe(
      {
        title,
        recipe_description,
        recipe_ingredients,
        time_to_make,
        date_created: new Date()
      },
      this.state.recipe.id
    )
      .then(recipe => {
        title.value = "";
        recipe_description.value = "";
        recipe_ingredients.value = "";
        time_to_make.value = "";
        this.handleEditSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  nonOwner = () => {
    return <h2>Error: you're not the owner of this recipe</h2>;
  };

  owner = () => {
    return (
      <div className="Creation">
        <header className="Creation-Header"></header>
        <form className="Creation-Form" to="/" onSubmit={this.editSubmit}>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="title"
              placeholder="Title"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="textfield"
              name="recipe_description"
              placeholder="Description"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label>
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="recipe_ingredients"
              placeholder="Ingredients"
            />
            <span className="a-field__label"></span>
          </label>
          <label>
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="time_to_make"
              placeholder="Time to make the recipe?"
            />
            <span className="a-field__label"></span>
          </label>
          <div className="btn-row">
            <button className="submitRecipeEdit">Submit</button>
            <Link to="/">
              <button className="cancelEditRecipe">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  };
  render() {
    return <div className="Edit">{this.ownerCheck()}</div>;
  }
}
