
import React, { useState, Component } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import IngredientHelper from "../../Helpers/Ingredient";
import styled from "styled-components";
import config from "../../config";
import TokenService from "../../Helpers/Token";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

export default class FancyModalButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      opacity: 0
    }
  }


  StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => this.props.opacity};
  transition: opacity ease 500ms;
  `;

  toggleModal = (e) => {
    // setIsOpen(!isOpen);
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  afterOpen = () => {
    // setTimeout(() => {
    this.setState({
      opacity: 1
    });
    // }, 10);
  }

  beforeClose = () => {
    this.setState({
      opacity: 0
    });
    // return new Promise(resolve => {
    //   setOpacity(0);
    //   // setTimeout(resolve, 200);
    // });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { ingredient_name, in_stock, notes } = e.target;
    const ingredientJson = JSON.stringify({
      ingredient_name: ingredient_name.value,
      in_stock: in_stock.value,
      notes: notes.value
    });
    console.log('ingredientJson is', ingredientJson);
    IngredientHelper.addIngredient(ingredientJson)
      .then(data => {
        console.log('post data is', data);
        this.props.refreshIngredients();
        this.toggleModal(e);
      });
  }

  fadingBackground = styled(BaseModalBackground)`
  opacity: ${props => this.state.opacity};
  transition: opacity ease 200ms;
`;

  render() {
    return (
      <ModalProvider backgroundComponent={this.fadingBackground}>
        <div>
          <button id="add-ingredient-button" onClick={this.toggleModal}>Add an ingredient</button>
          <this.StyledModal
            isOpen={this.state.isOpen}
            afterOpen={this.afterOpen}
            beforeClose={this.beforeClose}
            onBackgroundClick={this.toggleModal}
            onEscapeKeydown={this.toggleModal}
            opacity={this.state.opacity}
            backgroundProps={this.state.opacity}
          >
            <form id="modal-content"
              onSubmit={this.handleSubmit}
            >
              <label>Ingredient:</label>
              <input
                id="ingredient-name"
                name="ingredient_name"
                type="text"></input>
              <div id="ingredient-in-stock">
                <select
                  id="in-stock"
                  name="in_stock">In stock:
                <option value="in-stock">In stock</option>
                  <option value="out-of-stock">Out</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <label>Notes:</label>
              <input
                id="notes"
                name="notes"
                type="text"></input>
              <button id="close"
              // onClick={props.refreshIngredients}
              // onClick={toggleModal}
              >Hit it!</button>
            </form>
          </this.StyledModal>
        </div>
      </ModalProvider>
    );
  }
}


// function AddIngredient() {
//   return (
//     <ModalProvider backgroundComponent={FadingBackground}>
//       <div className="modal-container">
//         <FancyModalButton />
//       </div>
//     </ModalProvider>
//   );
// }

// export default AddIngredient;

