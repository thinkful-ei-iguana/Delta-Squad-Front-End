
import config from "../config";
import TokenService from './Token'


const IngredientHelper = {

  addIngredient(ingredientData) {
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/pantry`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: ingredientData
    })
  },

  updateRecipe(updatedData, id) {
    return fetch(`${config.API_ENDPOINT}/recipes/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.REACT_APP_API_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }
}


export default IngredientHelper;
