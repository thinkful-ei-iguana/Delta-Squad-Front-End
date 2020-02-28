import config from "../config";
import TokenService from "./Token";

const PlannerHelper = {
  addMealPlan(mealPlanData) {
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/planner`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: mealPlanData
    }).then(res => {
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  updateMealPlan(updatedData, id) {
    return fetch(`${config.API_ENDPOINT}/planner/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.REACT_APP_API_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  },
  recipeById(id) {
    const authToken = TokenService.getAuthToken();
    return fetch(`${config.API_ENDPOINT}/planner/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default PlannerHelper;
