// import React, { useState } from "react";
// import TokenService from '../../Helpers/Token'
// import config from '../../config';
// import styled from "styled-components";
// import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
// import "../../index.css";

// const StyledModal = Modal.styled`
// display: flex;
// align-items: center;
// justify-content: center;
// background-color: white;
// opacity: ${props => props.opacity};
// transition: opacity ease 500ms;
// `;

// function FancyModalButton(props) {
//   console.log('props in modal is', props);
//   const [isOpen, setIsOpen] = useState(false);
//   const [opacity, setOpacity] = useState(0);

//   function toggleModal(e) {
//     setIsOpen(!isOpen);
//   }

//   function afterOpen() {
//     setTimeout(() => {
//       setOpacity(1);
//     }, 10);
//   }

//   function beforeClose() {
//     return new Promise(resolve => {
//       setOpacity(0);
//       setTimeout(resolve, 200);
//     });
//   }

//   function handleSubmit(e) {
//     console.log('hit handle submit');
//     let ingredientId = props.id;

//     console.log('handle submit ingredient id', ingredientId);
//     const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
//     // const url = `${config.API_ENDPOINT}/pantry`;
//     const authToken = TokenService.getAuthToken();
//     let { ingredient_name, in_stock, notes } = e.target;
//     // debugger;
//     let updatedIngredient = {
//       id: ingredientId,
//       ingredient_name:
//         ingredient_name.value || props.ingredient_name,
//       in_stock: in_stock.value || props.in_stock,
//       notes: notes.value || props.notes
//     };
//     console.log(
//       "updated ingredient to be sent to server is",
//       updatedIngredient
//     );
//     fetch(url, {
//       method: "PATCH",
//       headers: {
//         "content-type": "application/json",
//         "authorization": `Bearer ${authToken}`
//       },
//       body: JSON.stringify(updatedIngredient)
//     })
//       .then(res => {
//         if (!res.ok) return res.json().then(error => Promise.reject(error));
//       })
//       .then(data => {
//         console.log("patch data is", data);
//         props.history.push("/pantry");
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   // function handleGoBack() {
//   //   return props.history.push("/pantry")
//   // }

//   function handleDeleteIngredient(props) {
//     debugger;
//     console.log('props in delete modal is', props);
//     let ingredientId = props.match.params.ingredientId;
//     const url = `${config.API_ENDPOINT}/pantry/${ingredientId}`;
//     const authToken = TokenService.getAuthToken();

//     console.log(
//       "ingredient to be sent to server is",
//       ingredientId
//     );
//     fetch(url, {
//       method: "DELETE",
//       headers: {
//         "content-type": "application/json",
//         "authorization": `Bearer ${authToken}`
//       }
//     })
//       .then(res => {
//         if (!res.ok) return res.json().then(error => Promise.reject(error));
//       })
//       .then(data => {
//         console.log("delete is", data);
//         // props.history.push("/pantry");
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   return (
//     <div className="modal-container">

//       <button className="edit-ingredient-button" onClick={toggleModal}>View/Edit</button>
//       <StyledModal
//         isOpen={isOpen}
//         afterOpen={afterOpen}
//         beforeClose={beforeClose}
//         onBackgroundClick={toggleModal}
//         onEscapeKeydown={toggleModal}
//         opacity={opacity}
//         backgroundProps={{ opacity }}
//       >
//         <div className="styled-modal-div">
//           <p id="current-ingredient-to-edit"></p>
//           <br />
//           <form id="modal-content"
//             onSubmit={handleSubmit}
//           >
//             <label>Ingredient:</label>
//             <input
//               id="ingredient-name"
//               name="ingredient_name"
//               type="text"
//               placeholder={ingredientName}></input>
//             <div id="ingredient-in-stock">
//               <select
//                 id="in-stock"
//                 name="in_stock"
//               >
//                 In stock:
//               <option>In stock</option>
//                 <option value="out-of-stock">Out</option>
//                 <option value="low">Low</option>
//               </select>
//             </div>
//             <label>Notes:</label>
//             <input
//               id="notes"
//               name="notes"
//               type="text"
//               placeholder={ingredientNotes}
//             >
//             </input>
//             <button id="update-ingredient-button" type="submit" onClick={e => handleSubmit(e)}>
//               Update
//         </button>
//             <button id="delete-ingredient-button" type="submit" onClick={handleDeleteIngredient}>
//               Delete
//         </button>
//             {/* <button id="go-back-button" type="submit" onClick={() => handleGoBack()}>
//               Go back
//         </button> */}
//           </form>
//         </div>
//       </StyledModal>
//     </div >
//   );
// }

// const FadingBackground = styled(BaseModalBackground)`
// opacity: ${props => props.opacity};
// transition: opacity ease 200ms;
// `;

// let ingredientName;
// // let ingredientInStock;
// let ingredientNotes;

// function App(props) {
//   // console.log('props in modal app is', props);
//   // this.setState({ ingredients: props });
//   const [ingredientNameState] = useState(props.ingredient_name)
//   ingredientName = ingredientNameState;
//   // console.log("ingredientName is", ingredientName);
//   // const [ingredientInStockState] = useState(props.in_stock)
//   // ingredientInStock = ingredientInStockState;
//   const [ingredientNotesState] = useState(props.notes)
//   ingredientNotes = ingredientNotesState;
//   return (
//     <ModalProvider backgroundComponent={FadingBackground}>
//       <div className="App">

//         {/* <h1>Hello styled-react-modal</h1>
//       <h2>Start editing to see some magic happen!</h2> */}
//         <FancyModalButton />
//       </div>
//     </ModalProvider>
//   );
// }



// export default App;



import React from "react";
export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <div>{this.props.children}</div>
        <div>
          <button
            onClose={e => {
              this.onClose(e);
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}
