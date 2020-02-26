import React from "react";
import ReactDOM from "react-dom";
import AddMealPlan from "../Components/Planner/MakeMealPlans";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddMealPlan />, div);
});
