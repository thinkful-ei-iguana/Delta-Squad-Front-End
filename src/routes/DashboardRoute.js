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

              <div className="home-link">             
                    <Link
                        id="home"
                        to={Home}>
                        Home
                    </Link>
               </div> 

               <div className="pantry">                
                    <Link 
                        id="pantry"
                        to={Pantry}>
                        Pantry
                    </Link>
               </div> 

               <div className="marketPlace">               
                    <Link 
                        id="marketplace"
                        to={MarketPlace}>
                        MarketPlace
                    </Link>
               </div> 

               <div className="recipeSearch">                
                    <Link 
                        id="recipeSearch"
                        to={RecipeSearch}>
                        RecipeSearch
                    </Link>
               </div> 

               <div className="accountInfo">                
                    <Link 
                        id="accountInfo"
                        to={AccountInfo}>
                        AccountInfo
                    </Link>
               </div> 

              </Switch>

           </div>  

        );
    }
}

export default DashboardRoute;