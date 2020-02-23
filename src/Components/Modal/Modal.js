import React, { Component, useState } from "react";
import TokenService from '../../Helpers/Token'
import config from '../../config';
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "../../index.css";
import { render } from "@testing-library/react";


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
    console.log('hit handle submit');
    let ingredientId = this.props.id;

    console.log('handle submit ingredient id', ingredientId);
    const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
    // const url = `${config.API_ENDPOINT}/pantry`;
    const authToken = TokenService.getAuthToken();
    let { ingredient_name, in_stock, notes } = e.target;
    console.log('e.target is', e.target);
    console.log('props ingredient name', this.props.ingredient_name);
    let updatedIngredient = {
      id: ingredientId,
      ingredient_name: ingredient_name ? ingredient_name.value : this.props.ingredient_name,
      in_stock: in_stock ? in_stock.value : this.props.in_stock,
      notes: notes ? notes.value : this.props.notes
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
        this.props.getIngredients();
        this.toggleModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // function handleGoBack() {
  //   return props.history.push("/pantry")
  // }

  handleDeleteIngredient = () => {
    console.log('props in delete modal is', this.props);
    let ingredientId = this.props.id;
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
        this.props.getIngredients();
        this.toggleModal();
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ModalProvider>
        <div className="modal-container">

          <button className="edit-ingredient-button" onClick={this.toggleModal}>View/Edit</button>
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
              <form id="modal-content"
                onSubmit={this.handleSubmit}
              >
                <label>Ingredient:</label>
                <input
                  id="ingredient-name"
                  name="ingredient_name"
                  type="text"
                  placeholder={this.props.ingredient_name}></input>
                <div id="ingredient-in-stock">
                  <select
                    id="in-stock"
                    name="in_stock"
                  >
                    In stock:
              <option value="in-stock">In stock</option>
                    <option value="out-of-stock">Out</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <label>Notes:</label>
                <input
                  id="notes"
                  name="notes"
                  type="text"
                  placeholder={this.props.notes}
                >
                </input>
                <button id="update-ingredient-button" type="submit"
                // onClick={this.handleSubmit}
                >
                  Update
        </button>
              </form>
              <button id="delete-ingredient-button" type="submit" onClick={this.handleDeleteIngredient}>
                Delete
        </button>
            </div>
          </this.StyledModal>
        </div >
      </ModalProvider>
    );
  }
}

// const FadingBackground = styled(BaseModalBackground)`
// opacity: ${props => props.opacity};
// transition: opacity ease 200ms;
// `;