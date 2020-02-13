import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../Helpers/Token";

class AddMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTitle: "",
      addMealDate: "",
      addPrepTime: "",
      addIngredientsReq: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let { title, planned_date, prep_time, needed_ingredients } = e.target;
    // let newIngredient = { ingredient_name, in_stock, notes};
    const authToken = TokenService.getAuthToken();
    const mealJson = JSON.stringify({
      title: title.value,
      planned_date: planned_date.value,
      prep_time: prep_time.value,
      needed_ingredients: needed_ingredients.value
    });
    const url = `${config.API_ENDPOINT}/planner`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: mealJson
    }).then(res => {
      console.log("res from POST is", res);
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  };

  handleAddMealPlanWindow = () => {
    return (
      <div>
        {this.props.title === true && (
          <div id="modal">
            <form
              id="modal-content"
              // onSubmit={this.handleSubmit}
            >
              <label>Title:</label>
              <input type="text"></input>
              <label>Meal Date:</label>
              <input type="text"></input>
              <label>Prep Time:</label>
              <input type="text"></input>
              <label>Ingredients Required:</label>
              <input type="text"></input>

              <button
                id="close"
                // onClick={this.setStateAddIngredient}
              >
                Hit it!
              </button>
            </form>
          </div>
        )}
      </div>

      // <Modal />
    );
  };

  // setStateAddIngredient = () => {
  //   if (this.state.addIngredient === false) {
  //     this.setState({
  //       addIngredient: true
  //     })
  //   }
  //   else { this.setState({ addIngredient: false }) }
  // }

  render() {
    console.log(this.state.addIngredient);

    return <div>{this.handleAddMealPlanWindow}</div>;
  }
}

export default AddMealPlan;
