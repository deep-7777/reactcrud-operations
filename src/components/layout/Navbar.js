import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Navbar = () => {
  const history = useHistory();

 
  const logout = () => {
   localStorage.removeItem("token")
   history.replace('/Login');

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
      <Link className="navbar-brand" to="/">Recat User</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/Login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/Register">Register</NavLink>
            </li>
          </ul>
        </div>
        <Link className="btn btn-outline-light" to="/users/add">Add User</Link>
      </div>
      <div>
        <button className="btn btn-outline-light" onClick={logout} > Logout</button> 
        </div>
    </nav>
  );
};

export default Navbar;
