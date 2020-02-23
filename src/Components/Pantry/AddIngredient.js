
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import IngredientHelper from "../../Helpers/Ingredient";
import styled from "styled-components";
import config from "../../config";
import TokenService from "../../Helpers/Token";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2F7604;
  opacity: ${props => props.opacity};
  transition: opacity ease 500ms;
`;


function FancyModalButton(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }
  // console.log('props is uuuuu', props);



  function handleSubmit(e) {
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
        toggleModal(e);
        // this.props.refreshIngredients();
        // this.props.closeAddForm();
      });
  }

  return (
    <div>
      <button id="add-ingredient-button" onClick={toggleModal}>Add an ingredient</button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        {/* <span>I am a m odal!</span> */}
        <form id="modal-content"
          onSubmit={handleSubmit}
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
      </StyledModal>
    </div>
  );
}

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

function AddIngredient() {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <div className="modal-container">
        <FancyModalButton />
      </div>
    </ModalProvider>
  );
}

export default AddIngredient;

