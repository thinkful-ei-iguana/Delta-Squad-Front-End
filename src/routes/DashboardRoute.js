import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './DashboardRoute.css';
// import NavMenu from './NavMenu/NavMenu';
//import Header from './Header/Header';
// import Home from './Home/Home';
// import Pantry from './Pantry/Pantry';
// import MarketPlace from './MarketPlace/MarketPlace';
// import RecipeSearch from './RecipeSearch/RecipeSearch';
// import AccountInfo from './Account-Info/Account-Info';

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
                    <li className="dashboard pantry">
                        <Link
                            className="dashboard-link-text"
                            to={"/pantry"}>
                            Pantry
                        </Link>
                    </li>

                    {/* <div className="marketPlace">               
                        <Link 
                            id="marketplace"
                            to={MarketPlace}>
                            MarketPlace
                        </Link>
                </div>  */}

                    <li className="dashboard recipes">
                        <Link
                            className="dashboard-link-text"

                            to={"/recipes"}>
                            Recipes
                        </Link>
                    </li>
                    <li className="dashboard meal-plan">
                        <Link
                            className="dashboard-link-text"
                            to={"/planner"}>
                            Plan a Meal
                        </Link>
                    </li>

                    {/* <div className="accountInfo">                
                        <Link 
                            id="accountInfo"
                            to={AccountInfo}>
                            AccountInfo
                        </Link>
                </div>  */}
                </ul>
            </div >
        );
    }
}

export default DashboardRoute;