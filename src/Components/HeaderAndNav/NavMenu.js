// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// class NavMenu extends Component {

//   static defaultProps = {
//     bandId: ''
//   }

//   render() {
//     const bandId = this.props.bandId;
//     return (
//       <div>
//         <nav id="nav-bar-container">
//           <Link
//             className="nav-link-text setlists"
//             to={`/dashboard/band/${bandId}/setlists`}>Setlists</Link>
//           <Link
//             className="nav-link-text songs"
//             to={`/dashboard/band/${bandId}/songs`}>Repertoire</Link>
//           <br />
//           <Link
//             className="nav-link-text user"
//             to={'/dashboard/user'}>User Dashboard</Link>
//           <Link
//             className="nav-link-text band"
//             to={`/dashboard/band/${bandId}`}>Band Dashboard</Link>

//         </nav>
//       </div>
//     );
//   }
// }

// export default NavBar;