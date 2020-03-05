import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashboardRoute.css';


class DashboardRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div id="dashboard-container">
                <ul id="dashboard-links-list">
                    <Link
                        className="dashboard-link-text"
                        to={"/pantry"}>
                        <li className="dashboard pantry">
                            <p className="pantrytag">
                                Pantry
                            </p>
                        </li>
                    </Link>
                    <Link
                        className="dashboard-link-text"
                        to={"/recipes"}>
                        <li className="dashboard recipes">
                            <p className="recipetag">
                                Recipes
                            </p>
                        </li>
                    </Link>
                    <Link
                        className="dashboard-link-text"
                        to={"/planner"}>
                        <li className="dashboard meal-plan">
                            <p className="mealplantag">
                                Plan a Meal
                            </p>
                        </li>
                    </Link>
                </ul>
            </div >
        );
    }
}

export default DashboardRoute;