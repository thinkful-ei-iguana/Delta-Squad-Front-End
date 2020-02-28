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
                            Pantry
                    </li>
                    </Link>
                    <Link
                        className="dashboard-link-text"
                        to={"/recipes"}>
                        <li className="dashboard recipes">
                            Recipes
                    </li>
                    </Link>
                    <Link
                        className="dashboard-link-text"
                        to={"/planner"}>
                        <li className="dashboard meal-plan">
                            Plan a Meal
                    </li>
                    </Link>
                </ul>
            </div >
        );
    }
}

export default DashboardRoute;