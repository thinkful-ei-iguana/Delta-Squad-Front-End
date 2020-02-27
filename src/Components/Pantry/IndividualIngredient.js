import React, { Component } from "react";
import TokenService from '../../Helpers/Token'
import config from '../../config';
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "../../index.css";


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
    let ingredientId = this.props.id;

    const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
    const authToken = TokenService.getAuthToken();
    let { ingredient_name, in_stock, notes } = e.target;
    let updatedIngredient = {
      id: ingredientId,
      ingredient_name: ingredient_name.value || this.props.ingredient_name,
      in_stock: in_stock.value || this.props.in_stock,
      notes: notes.value || this.props.notes
    };
    console.log('updated ingredient is', updatedIngredient);
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
        // this.props.getIngredients();
        this.toggleModal(e);
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleDeleteIngredient = (e) => {
    let ingredientId = this.props.id;
    const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
    const authToken = TokenService.getAuthToken();

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
        this.props.getIngredients();
        this.toggleModal(e);
      })
      .catch(error => {
        console.error(error);
      });
  }


  fadingBackground = styled(BaseModalBackground)`
    opacity: ${props => props.opacity};
    transition: opacity ease 200ms;
    `;

  render() {
    return (
      <ModalProvider backgroundComponent={this.fadingBackground}>
        <div className="modal-container">
          <div className="ingredientInfoContainer">
            <button className="edit-ingredient-button smallButton" onClick={this.toggleModal}>View/Edit</button>
          </div>
          <this.StyledModal
            isOpen={this.state.isOpen}
            afterOpen={this.afterOpen}
            beforeClose={this.beforeClose}
            onBackgroundClick={this.toggleModal}
            onEscapeKeydown={this.toggleModal}
            opacity={this.state.opacity}
            backgroundProps={this.state.opacity}
          >
            <div className="styled-modal-div">
              <p id="current-ingredient-to-edit"></p>
              <br />
              <form
                id="modal-content"
                onSubmit={this.handleSubmit}
              >
                <label>Ingredient:</label>
                <input
                  className="modalInput"
                  id="ingredient-name"
                  name="ingredient_name"
                  type="text"
                  placeholder={this.props.ingredient_name}></input>
                <div id="ingredient-in-stock">
                  <label className="inventory-dropdown-text">In stock?:</label>
                  <br />
                  <select
                    id="in-stock"
                    name="in_stock"
                    className="dropDown"
                  >
                    In stock:
              <option value="in-stock">In stock</option>
                    <option value="out-of-stock">Out</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <label>Notes:</label>
                <input
                  className="modalInput"
                  id="notes"
                  name="notes"
                  type="text"
                  placeholder={this.props.notes}
                >
                </input>
                <button id="update-ingredient-button" className="smallButton" type="submit">
                  Update
                </button>
                <button id="delete-ingredient-button" className="smallButton" type="submit" onClick={this.handleDeleteIngredient}>
                  Delete
                </button>
              </form>

            </div>
          </this.StyledModal>
        </div >
      </ModalProvider>
    );
  }
}
