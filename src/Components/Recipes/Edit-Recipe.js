import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../Helpers/Recipe";
import Context from "../../Contexts/Context";
import RecipeHelper from "../../Helpers/Recipe";
import _ from "lodash";

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
    RecipeHelper.recipeById(_.get(this, "props.match.params.recipeId")).then(
      data => {
        this.setState({ recipe: data });
      }
    );
  }

  handleEditSuccess = () => {
    const { history } = this.props;

    history.push(`/recipes/${this.state.recipe.id}`);
  };

  editSubmit = ev => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const recipe_description = ev.target.recipe_description.value.split("\n");
    const recipe_ingredients = ev.target.recipe_ingredients.value.split(", ");
    const time_to_make = ev.target.time_to_make.value;

    this.setState({ error: null });
    Recipe.updateRecipe(
      {
        id: this.state.recipe.id,
        title,
        recipe_description,
        recipe_ingredients,
        time_to_make
      },
      this.state.recipe.id
    )
      .then(recipe => {
        this.handleEditSuccess();
        title.value = "";
        recipe_description.value = "";
        recipe_ingredients.value = "";
        time_to_make.value = "";
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  owner = () => {
    let instructionsArr = [];
    if (this.state.recipe.recipe_description) {
      let desc = this.state.recipe.recipe_description.slice(2);
      let desc1 = desc.slice(0, -2);
      let descarr = desc1.split('","');
      descarr.map(instruction => instructionsArr.push(instruction));
    }
    return (
      <div className="Creation">
        <header className="Creation-Header"></header>
        <form className="Creation-Form" to="/" onSubmit={this.editSubmit}>
          <label className="field a-field a-field_a2">
            Title:
            <input
              className="field__input a-field__input"
              required
              name="title"
              defaultValue={this.state.recipe.title}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            Ingredients:
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="recipe_ingredients"
              defaultValue={
                this.state.recipe.recipe_ingredients &&
                this.state.recipe.recipe_ingredients.join(", ")
              }
            />
            <span className="a-field__label"></span>
          </label>
          <label className="field a-field a-field_a2">
            Instructions:
            <textarea
              className="field__input a-field__input instructionsField"
              required
              type="textfield"
              name="recipe_description"
              defaultValue={instructionsArr.join("\n")}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>

          <label className="field a-field a-field_a2">
            Time to Make (in minutes):
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="time_to_make"
              defaultValue={this.state.recipe.time_to_make}
            />
            <span className="a-field__label"></span>
          </label>
          <div className="btn-row">
            <button className="smallButton">Submit</button>
            <Link to={`/recipes/${this.state.recipe.id}`}>
              <button className="smallButton">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  };
  render() {
    return <div className="Edit">{this.owner()}</div>;
  }
}
