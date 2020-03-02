
import React, { Component } from "react";
import IngredientHelper from "../../Helpers/Ingredient";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

export default class FancyModalButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      opacity: 0,
      error: null
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
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  afterOpen = () => {
    this.setState({
      opacity: 1
    });
  }

  beforeClose = () => {
    this.setState({
      opacity: 0
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { ingredient_name, in_stock, notes } = e.target;
    const ingredientJson = JSON.stringify({
      ingredient_name: ingredient_name.value,
      in_stock: in_stock.value,
      notes: notes.value
    });
    IngredientHelper.addIngredient(ingredientJson)
      .then(res => {
        if (!res.ok) { this.setState({ error: !res.ok }) }
        else {
          this.props.refreshIngredients();
          this.toggleModal(e);
        }
      })
  }

  fadingBackground = styled(BaseModalBackground)`
    opacity: ${props => this.state.opacity};
    transition: opacity ease 200ms;
  `;

  render() {
    let error = this.state.error;
    return (
      <ModalProvider backgroundComponent={this.fadingBackground}>
        <div>
          <button className="medButton" onClick={this.toggleModal}>Add an ingredient</button>
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
              {error && <p className="empty-fields-error-message-green-bg">Ingredient field must contain <br /> characters (not just spaces). <br />Please try again.</p>}

              <label>Ingredient*:</label>
              <input
                id="ingredient-name"
                className="modalInput"
                name="ingredient_name"
                required
                type="text"></input>
              <div id="ingredient-in-stock">
                <label className="inventory-dropdown-text">In stock?*:</label>
                <br />
                <select
                  id="in-stock"
                  className="drop-down"
                  required
                  name="in_stock">
                  <option value="in-stock">In stock</option>
                  <option value="out-of-stock">Out</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <label>Notes*:</label>
              <input
                id="notes"
                name="notes"
                required
                type="text"
                className="modalInput"></input>
              <button className="smallButton" id="close"
              >Hit it!</button>
            </form>
          </this.StyledModal>
        </div>
      </ModalProvider>
    );
  }
}

