import React from "react";
import ReactDOM from "react-dom";
import AddMealPlan from "./MakeMealPlans";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

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
    '<div><div id="modal-planner"><form id="modal-content-planner"><label class="plannerLabel">MealPlan:</label><select class="dropDown" name="recipe_id" type="text"></select><label class="plannerLabel">Meal Date:</label><input name="planned_date" type="text" class="modalInput"><label class="plannerLabel">Prep Time:</label><div class="plannerInfo"><h2 name="time_to_make" type="text"> Minutes</h2></div><label class="plannerLabel">Ingredients-Required:</label><div class="plannerInfo"><h3 type="text"></h3></div><h2 name="needed_ingredients" type="text"></h2><button class="smallButton" id="close-planner">Plan it!</button></form></div></div>'
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <AddMealPlan />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
