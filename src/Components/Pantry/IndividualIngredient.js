import React, { Component } from "react";
import TokenService from '../../Helpers/Token'

class IndividualIngredient extends Component {

  render() {
    console.log('this.props', this.props);
    return (
      <section>
        <p>Ingredient: {this.props.location.state.ingredient_name}</p>
        <p>In stock: {this.props.location.state.in_stock}</p>
        <p>Notes: {this.props.location.state.notes}</p>
      </section>
    )
  }
}

export default IndividualIngredient;