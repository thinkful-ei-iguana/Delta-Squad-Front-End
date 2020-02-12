import React, { Component } from "react";
import config from '../../config';
import TokenService from "../../Helpers/Token";

class AddIngredient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addIngredient: false,
      newIngredient: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      newIngredient: e.target.value
    })

    let newIngredient = this.state.newIngredient;
    const authToken = TokenService.getAuthToken();
    const ingredientJson = JSON.stringify({
      newIngredient: newIngredient,
      // ingredient_owner: this.props.allIngredients[0].ingredient_owner
    });
    const url = `${config.API_ENDPOINT}/pantry`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: ingredientJson
    }).then(res => {
      console.log('res from POST is', res);
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    }
    );


  }



  handleAddIngredientWindow = () => {
    return (
      <div>
        {this.props.addIngredient === true &&
          <div id="modal">
            <form id="modal-content"
            // onSubmit={this.handleSubmit}
            >
              <label>Ingredient:</label>
              <input type="text"></input>
              <div id="ingredient-in-stock">
                <select>In stock:
                <option value="in-stock">In stock</option>
                  <option value="out">Out</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <label>Notes:</label>
              <input type="text"></input>
              <button id="close"
              // onClick={this.setStateAddIngredient}
              >Hit it!</button>
            </form>
          </div>}

      </div>

      // <Modal />
    )
  }

  // setStateAddIngredient = () => {
  //   if (this.state.addIngredient === false) {
  //     this.setState({
  //       addIngredient: true
  //     })
  //   }
  //   else { this.setState({ addIngredient: false }) }
  // }


  render() {
    console.log(this.state.addIngredient);

    return (
      <div>
        {this.handleAddIngredientWindow()}
      </div>
    )
  }
}

export default AddIngredient;