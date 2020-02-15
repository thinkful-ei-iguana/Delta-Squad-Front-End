import React from "react";
import RecentResults from "./Recent-Results";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section id="Home-Header">
          <p className="user-greeting">Welcome,     ! Let's get cooking!</p>
          <form id="SearchForm">
            <label className="field a-field a-field_a2">
              <input
                className="field__input a-field__input"
                placeholder="Search for recipes"
                required
              />
              <span className="a-field__label-wrap">
                <span className="a-field__label">Search</span>
              </span>
            </label>
          </form>
        </section>
        <section className="Home-RecentResults">
          <RecentResults />
        </section>
      </div>
    );
  }
}
