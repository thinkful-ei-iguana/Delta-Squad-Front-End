import React from "react";
import ReactDOM from "react-dom";
import AddMealPlan from "./MakeMealPlans";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddMealPlan />, div);
  expect(div.innerHTML).toBe("<div></div>");
  ReactDOM.unmountComponentAtNode(div);
});
it("renders adding a mealplan", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddMealPlan addMealPlan={true} />, div);
  expect(div.innerHTML).toBe(
    '<div><div id="modal-planner"><form id="modal-content-planner"><label>MealPlan:</label><select class="mealplantitle-select" name="recipe_id" type="text"></select><label>Meal Date:</label><input name="planned_date" type="text"><label>Prep Time:</label><h2 name="time_to_make" type="text"></h2><label>Ingredients-Required:</label><h3 type="text"></h3><h2 name="needed_ingredients" type="text"></h2><button id="close-planner">Plan it!</button></form></div></div>'
  );
  ReactDOM.unmountComponentAtNode(div);
});
