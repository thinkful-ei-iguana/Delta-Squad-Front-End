import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlannerHelper from "../../Helpers/Planner";
import MealPlans from "./MealPlans";
import UserContext from "../../Contexts/UserContext";

class EditMealPlan extends Component {
  static contextType = UserContext;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mealplans: {}
    };
  }

  componentDidMount() {
    PlannerHelper.mealPlanById(this.props.match.params.mealplanid).then(
      data => {
        this.setState({ mealplans: data });
      }
    );
  }

  //   ownerCheck = () => {
  //     console.log(this.context, " context");
  //     console.log(this.state, "state");
  //     console.log(this.props, "props");
  //     if (this.context.currentUser.id !== this.state.mealplan.owner) {
  //       return this.nonOwner();
  //     } else {
  //       return this.owner();
  //     }
  //   };

  // let mealPlanId = this.props.match.params.mealPlanId;
  // const url = `${config.API_ENDPOINT}/planner${mealPlanId}`;
  // const authToken = TokenService.getAuthToken();

  handleEditSuccess = () => {
    const { history } = this.props;
    history.push("/");
  };

  editSubmit = ev => {
    ev.preventDefault();
    const title = ev.target.title.value;

    this.setState({ error: null });
    MealPlans.updateMealPlan(
      {
        title,
        date_created: new Date()
      },
      this.state.mealplan.id
    )
      .then(mealplan => {
        title.value = "";
        this.handleEditSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  nonOwner = () => {
    return <h2>Error: you're not the owner of this meal plan</h2>;
  };

  owner = () => {
    return (
      <>
        <div className="EditMealPlan">
          <header className="EditMealPlan-Header"></header>
          <form className="EditMealPlan-Form" to="/" onSubmit={this.editSubmit}>
            <label className="field a-field a-field_a2">
              <input
                className="field__input a-field__input"
                required
                name="title"
                placeholder="Title"
              />
              <span className="a-field__label-wrap">
                <span className="a-field__label"></span>
              </span>
            </label>
            <div className="btn-row">
              <Link to="/">
                <button className="submitMealPlanEdit">Submit</button>
              </Link>
              <Link to="/">
                <button className="cancelEditMealPlan">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  };
  render() {
    return <div className="Edit">{/* {this.ownerCheck()} */}</div>;
  }
}

export default EditMealPlan;
