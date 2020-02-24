import config from "../config";
import TokenService from "./Token";

const PlannerHelper = {
  addMealPlan(mealPlanData) {
    console.log(mealPlanData, "mealPlanData");
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
      console.log("res from POST is", res);
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
  }

  // deleteMealPlan(id) {
  //   return fetch(`${config.API_ENDPOINT}/planner/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${config.TOKEN_KEY}`
  //     }
  //   });
  // },

  // mealPlanById(id) {
  //   // console.log("getting recipe by id");
  //   return fetch(`${config.API_ENDPOINT}/planner/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json"
  //     }
  //   }).then(res =>
  //     !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
  //   );
  // },
  // getAllMyMealPlans(mealplan_owner) {
  //   return fetch(`${config.API_ENDPOINT}/planner/user/${mealplan_owner}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json"
  //     }
  //   }).then(res =>
  //     !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
  //   );
  // },
};

export default PlannerHelper;
