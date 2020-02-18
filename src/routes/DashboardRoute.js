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
                <Link
                    className="dashboard-link-text"
                    to={"/pantry"}>
                    <li className="dashboard pantry">   
                            Pantry
                    </li>
                </Link>

                    {/* <div className="marketPlace">               
                        <Link 
                            id="marketplace"
                            to={MarketPlace}>
                            MarketPlace
                        </Link>
                </div>  */}
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