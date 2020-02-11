import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

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
               <Route 
                 exact
                 path='/'
                 render={routeProps => {
                     return <Home {...routeProps} />;                     
                 }} 
                /> 
               <Route
                 exact
                 path='/Pantry'
                 render={routeProps => {
                     return <Pantry {...routeProps} />;                     
                 }}
                 />
                 <Route
                   exact
                   path="MarketPlace"
                   render={routeProps => {
                       return <MarketPlace {...routeProps} />;
                   }}
                 />
                 <Route
                   exact
                   path="RecipeSearch"
                   render={routeProps => {
                       return <RecipeSearch {...routeProps} />;
                   }}  
                 />  
                 <Route
                   exact
                   path="AccountInfo"
                   render={routeProps => {
                       return <AccountInfo {...routeProps} />;
                   }}
                 />  

           </Switch>

           </div>  

        )
    }
}

export default DashboardRoute;