import React from "react";
import ReactDOM from "react-dom";
import MealPlan from "./MealPlan";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MealPlan />, div);
  expect(div.innerHTML).toBe(
    '<div id="individual-mealplan-view"><section id="original-mealplan-data"><h2 id="update-header">Update</h2><p>Title: <br>Planned date: <br>Time to make: <br>Ingredients required:</p></section><button id="update-mealplan-button" type="submit">Update</button><button id="delete-mealplan-button" type="submit">Delete</button><div></div><button id="go-back-button" type="submit">Go back</button></div>'
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <MealPlan />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
