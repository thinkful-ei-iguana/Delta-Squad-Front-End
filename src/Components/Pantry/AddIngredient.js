import React, { Component } from "react";
// import config from '../../config';
// import TokenService from "../../Helpers/Token";
import IngredientHelper from "../../Helpers/Ingredient";

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
    let { ingredient_name, in_stock, notes } = e.target;
    // let newIngredient = { ingredient_name, in_stock, notes};
    const ingredientJson = JSON.stringify({
      ingredient_name: ingredient_name.value,
      in_stock: in_stock.value,
      notes: notes.value
    });
    IngredientHelper.addIngredient(ingredientJson)
      .then(data => {
        console.log('post data is', data);
        this.props.closeAddForm();
      });


  }



  handleAddIngredientWindow = () => {
    return (
      <div>
        {this.props.addIngredient === true &&
          <div id="modal">
            <form id="modal-content"
              onSubmit={this.handleSubmit}
            >
              <label>Ingredient:</label>
              <input
                name="ingredient_name"
                type="text"></input>
              <div id="ingredient-in-stock">
                <select
                  name="in_stock">In stock:
                <option value="in-stock">In stock</option>
                  <option value="out">Out</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <label>Notes:</label>
              <input
                name="notes"
                type="text"></input>
              <button id="close"
              // onClick={this.props.toggleAddForm}
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