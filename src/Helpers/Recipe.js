import config from "../config";
import TokenService from './Token'

const RecipeHelper = {
  createRecipe(newRecipe) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(newRecipe)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  recipeById(id) {
    const authToken = TokenService.getAuthToken();
    // console.log("getting recipe by id");
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // ${this.recipes.filter(
  //   recipes => recipes.owner === this.recipes.owner
  // )}

  getRecipeOwnerData(id) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/recipe/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  search(term) {
    return fetch(`${config.API_ENDPOINT}/recipes/search/${term}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  delete(id) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
    });
  },

  getAllMyRecipes(owner) {
    return fetch(`${config.API_ENDPOINT}/recipes/user/${owner}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateRecipe(updatedData, id) {
    const authToken = TokenService.getAuthToken()
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedData)
    });
  }
};

export default RecipeHelper;
