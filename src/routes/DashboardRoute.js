import React, { Component } from 'react';
import { Switch, Link } from 'react-router-dom';

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
          <div className="Dashboard"> 
           {/* <NavMenu /> */}
           <Header />
           <Switch>
               <Link to={Home}>Home</Link>
               <Link to={Pantry}>Pantry</Link>
                 <Link to={MarketPlace}>MarketPlace</Link>
                 <Link to={RecipeSearch}>RecipeSearch</Link>
                 <Link to={AccountInfo}>AccountInfo</Link> 

           </Switch>

           </div>  

        )
    }
}

export default DashboardRoute;