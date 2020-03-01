import React from "react";
import ReactDOM from "react-dom";
import AddMealPlan from "./MakeMealPlans";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter>
    <AddMealPlan />
  </BrowserRouter>, div);
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
