import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../../Helpers/Recipe";
import Context from "../../Contexts/Context";
import TokenService from "../../Helpers/Token";

export default class CreateRecipe extends React.Component {
  static contextType = Context;
  static defaultProps = {
    currentUser: {},
    location: {},
    history: {
      push: () => { }
    }
  };

  componentDidMount() {
    console.log('context is', this.context);
   /* if (!this.context.hasAuthToken()) {
      this.props.history.push("/Login");
    }*/
  }

  handleCreationSuccess = () => {
    const { history } = this.props;
    history.push("/");
  };

  state = { error: null };

  createSubmit = e => {
    e.preventDefault();
    const created_by = this.context.currentUser.id;
    const {
      title,
      recipe_description,
      recipe_ingredients,
      time_to_make
    } = e.target;
    console.log('title is', title.value);
    this.setState({ error: null });
    console.log('id is', this.context);
    Recipe.createRecipe({
      title: title.value,
      owner: this.context.currentUser.id,
      recipe_description: recipe_description.value,
      recipe_ingredients: recipe_ingredients.value,
      time_to_make: time_to_make.value,
    //  created_by: created_by.value
    })
      .then(recipe => {
        title.value = "";
        recipe_description.value = "";
        recipe_ingredients.value = "";
        time_to_make.value = "";
        this.handleCreationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
    
      <div className="Creation">
        <header className="Creation-Header"></header>
        <form className="Creation-Form" onSubmit={this.createSubmit}>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="title"
              placeholder="Title"
            />
            <span className="a-field__label-wrap"></span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="recipe_description"
              placeholder="Recipe description"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="recipe_ingredients"
              placeholder="Recipe ingredients"
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
              name="time_to_make"
              placeholder="Time to make the recipe"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="image"
              placeholder="Recipe image url"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <div className="btn-row">
            <button className="submitCreateRecipe">Create recipe</button>
            <Link to="">
              <button className="cancelEditRecipe">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
