import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import https from "https"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
// debugger;
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      // const agent = new https.Agent({ rejectUnauthorized: false });
      const response = await fetch("http://192.168.1.44:45455/Login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        // agent: agent,
        // agent: new https.Agent({ rejectUnauthorized: false })
      });
        // debugger
      if (response) {
        console.log("response",response)
        const data = await response.text();
        const token = data;
        console.log("data", data);
        console.log("Logged in successfully");
      

        localStorage.setItem("token", data);

        history.replace('/');
        // Handle the response and token here
      } else {
        console.log("Login failed");
        // Handle the error response here
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Log in </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
