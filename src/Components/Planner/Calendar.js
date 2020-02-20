import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../Helpers/Token";
import UserContext from "../../Contexts/UserContext";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2F7604;
  opacity: ${props => props.opacity};
  transition: opacity ease 500ms;
`;

class Calendar extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
      newEvent: [],
      postEvent: []
    };
  }

  //   handleSubmit = e => {
  //     e.preventDefault();
  //     let { title, planned_date, prep_time, needed_ingredients } = e.target;
  //     const mealPlanJson = JSON.stringify({
  //       title: title.value,
  //       planned_date: planned_date.value,
  //       prep_time: prep_time.value,
  //       needed_ingredients: needed_ingredients.value
  //     });
  //     PlannerHelper.addMealPlan(mealPlanJson).then(data => {
  //       console.log("post data is", data);
  //       this.props.refreshMealPlans();
  //       this.props.closeAddForm();
  //     });
  //   };

  // const date;
  // const eventDescription;
  // const userId;

  // what does a calendar need,
  // userId
  // a set of dates to select from and logic for how many days per month to display
  // needs to be able to apply that date to the 'planned_date' of the mealplans component
  // once the date has been selected it needs to hold that date in state so it can be passed as a prop to mealplans as the planned date
  initCalendar = () => {
    // start calendar
  };

  getDate = () => {
    // get date for calendar
  };

  displayDate = userId => {
    // changes css to highlight correct ID in dom (may need to be changed to fit our needs)
  };

  getDescription = () => {
    // gets user I/O and assigns to global variable
  };

  displayDescription = userId => {
    // writes description of mealplan to correct user id
  };

  next = () => {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  };

  previous = () => {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  };

  jump = () => {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
  };

  showCalendar = (month, year) => {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // creates a table row
      let row = document.createElement("tr");

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
          if (
            date === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
          ) {
            cell.classList.add("bg-info");
          } // color today's date
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }
      }
      tbl.appendChild(row); // appending each row into calendar body.
    }
  };
  render() {
    return (
      <div class="container col-sm-4 col-md-7 col-lg-4 mt-5">
        <div class="card">
          <h3 class="card-header" id="monthAndYear"></h3>
          <table class="table table-bordered table-responsive-sm" id="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>

            <tbody id="calendar-body"></tbody>
          </table>

          <div class="form-inline">
            <button
              class="btn btn-outline-primary col-sm-6"
              id="previous"
              onclick="previous()"
            >
              Previous
            </button>

            <button
              class="btn btn-outline-primary col-sm-6"
              id="next"
              onclick="next()"
            >
              Next
            </button>
          </div>
          <br />
          <form class="form-inline">
            <label class="lead mr-2 ml-2" for="month">
              Jump To:{" "}
            </label>
            <select
              class="form-control col-sm-4"
              name="month"
              id="month"
              onchange="jump()"
            >
              <option value={0}>Jan</option>
              <option value={1}>Feb</option>
              <option value={2}>Mar</option>
              <option value={3}>Apr</option>
              <option value={4}>May</option>
              <option value={5}>Jun</option>
              <option value={6}>Jul</option>
              <option value={7}>Aug</option>
              <option value={8}>Sep</option>
              <option value={9}>Oct</option>
              <option value={10}>Nov</option>
              <option value={11}>Dec</option>
            </select>

            <label for="year"></label>
            <select
              class="form-control col-sm-4"
              name="year"
              id="year"
              onchange="jump()"
            >
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
              <option value={2029}>2029</option>
              <option value={2030}>2030</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}

export default Calendar;
