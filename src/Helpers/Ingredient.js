
import config from "../config";

const IngredientHelper = {

  updateRecipe(updatedData, id) {
    return fetch(`${config.API_ENDPOINT}/recipes/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }
}


export default IngredientHelper;
