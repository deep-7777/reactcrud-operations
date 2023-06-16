import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/"  component={Home} />
          <Route path="/about"  component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/users/add" component={AddUser} />
          <Route path="/users/edit/:id" component={EditUser} />
          <Route path="/users/:id" component={User} />  
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
