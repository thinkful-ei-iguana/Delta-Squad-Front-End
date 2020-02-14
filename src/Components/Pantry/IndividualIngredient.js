import React, { Component } from "react";
import TokenService from '../../Helpers/Token'
import config from '../../config';
import "./Pantry.css";



class IndividualIngredient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: [],
      updateIngredient: false
    };
  }

  componentDidMount() {
    this.setIngredient();
  }

  setIngredient = () => {
    const originalIngredient = this.props.location.state;
    console.log("original ingredient", this.props.location.state);

    this.setState({
      ingredient: originalIngredient
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let ingredientId = this.props.match.params.ingredientId;
    const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
    const authToken = TokenService.getAuthToken();
    let { ingredient_name, in_stock, notes } = e.target;

    let updatedIngredient = {
      id: ingredientId,
      ingredient_name:
        ingredient_name.value || this.props.location.state.ingredient_name,
      in_stock: in_stock.value || this.props.location.state.in_stock,
      notes: notes.value || this.props.location.state.notes
    };
    console.log(
      "updated ingredient to be sent to server is",
      updatedIngredient
    );
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedIngredient)
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })
      .then(data => {
        console.log("patch data is", data);
        // this.resetFields(updatedIngredient)
        // this.context.editBookmark(newBookmark)
        this.props.history.push("/pantry");
      })
      .catch(error => {
        console.error(error);
      });
  };

  // resetFields = (newFields) => {
  //   this.setState({
  //     id: newFields.id || '',
  //     title: newFields.title || '',
  //     url: newFields.url || '',
  //     description: newFields.description || '',
  //     rating: newFields.rating || '',
  //   })
  // }

  handleGoBack = () => {
    return this.props.history.push("/pantry")
  }

  setStateUpdateIngredientTrue = () => {
    this.setState({
      updateIngredient: true
    })
  }

  handleUpdateIngredient = () => {
    return (
      <div>
        {this.state.updateIngredient === true &&
          <div>
            <form id="modal-content" onSubmit={this.handleSubmit}>
              <label>Ingredient:</label>
              <input id="ingredient" name="ingredient_name" type="text"></input>
              <div id="ingredient-in-stock">
                <select id="in-stock" name="in_stock">
                  In stock:
              <option value="in-stock">In stock</option>
                  <option value="out">Out</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <label>Notes:</label>
              <input id="notes" name="notes" type="text"></input>
              <button id="close">Hit it!</button>
            </form>

          </div>}
      </div>
    )
  }

  handleDeleteIngredient = (e) => {
    e.preventDefault();
    let ingredientId = this.props.match.params.ingredientId;
    const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
    const authToken = TokenService.getAuthToken();

    console.log(
      "ingredient to be sent to server is",
      ingredientId
    );
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${authToken}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })
      .then(data => {
        console.log("delete is", data);
        this.props.history.push("/pantry");
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log("this.props", this.props);
    return (

      <div id="individual-ingredient-view">
        <section id="original-ingredient-data">
          <h2 id="update-header"></h2>
          <p>
            Ingredient: {this.props.location.state.ingredient_name}
            <br />
            In stock? {this.props.location.state.in_stock}
            <br />
            Notes: {this.props.location.state.notes}
          </p>
        </section>
        <button id="update-ingredient-button" type="submit" onClick={() => this.setStateUpdateIngredientTrue()}>
          Update
        </button>
        <button id="update-ingredient-button" type="submit" onClick={(e) => this.handleDeleteIngredient(e)}>
          Delete
        </button>
        {this.handleUpdateIngredient()}
        <button id="go-back-button" type="submit" onClick={() => this.handleGoBack()}>
          Go back
        </button>
      </div>
    )



  }
}

export default IndividualIngredient;
