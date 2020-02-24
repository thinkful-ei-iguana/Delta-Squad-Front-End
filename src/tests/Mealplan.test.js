import React from "react";
import ReactDOM from "react-dom";
import MealPlan from "../Components/Planner/MealPlan";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MealPlan />, div);
  ReactDOM.unmountComponentAtNode(div);
});
