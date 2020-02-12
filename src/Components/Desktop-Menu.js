// import React from "react";
// import { Link } from "react-router-dom";
// import Context from "../Contexts/Context";
// import "../Styles/Buttons.css";

// export default class DesktopMenu extends React.Component {
//   static contextType = Context;
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchText: ""
//     };
//   }
//   render() {
//     console.log('this.context is', this.context);
//     return (
//       <div className="desktopMenu">
//         {this.context.isLoggedIn ? (
//           <div className="Header__logged-in">
//             <div className="dropdown">
//               User: {this.context.currentUser.user_name}
//               <div className="user-name-div">
//                 <Link
//                   className="user-name"
//                   to={`/user/${this.context.currentUser.user_name}`}
//                 >
//                   My Account
//                 </Link>
//               </div>
//               <div className="create-new-recipe-div">
//                 <p></p>
//                 <Link className="create-new-recipe" to="/Create-Recipe">
//                   Create Recipe
//                 </Link>
//               </div>
//               <div className="logout-button-div">
//                 <p></p>
//                 <p></p>
//                 <Link
//                   className="logout-button"
//                   onClick={this.context.onLogout}
//                   to="/"
//                 >
//                   Logout
//                 </Link>
//                 <p></p>
//               </div>
//             </div>
//           </div>
//         ) : (
//             <div className="Header__logged-out">
//               <Link className="login" to="/login">
//                 Log in Test
//             </Link>
//               <p></p>
//               <Link className="create-account" to="/create-account">
//                 {" "}
//                 Register
//             </Link>
//               <p></p>
//             </div>
//           )}
//       </div>
//     );
//   }
// }
