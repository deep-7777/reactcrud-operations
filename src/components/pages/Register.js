import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    Name: "",
    MiddleName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const { Name, MiddleName, LastName, Email, Password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://192.168.1.44:8012/Registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");
        // Reset the form fields after successful registration
        setFormData({
          Name: "",
          MiddleName: "",
          LastName: "",
          Email: "",
          Password: "",
        });
        history.replace("/Login");
      } else {
        console.error("Error registering user:", response.status);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container">
      <div className="w-50 mx-auto shadow p-5">
        <h2 className="mb-4">New Registration</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputname" className="form-label">
              <h5>Name</h5>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="Name"
              value={Name}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              <h5>MiddleName</h5>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your MiddleName"
              name="MiddleName"
              value={MiddleName}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputLastName" className="form-label">
              <h5>LastName</h5>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your LastName"
              name="LastName"
              value={LastName}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>Email Address</h5>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your E-mail Address"
              name="Email"
              value={Email}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              <h5>Password</h5>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              name="Password"
              value={Password}
              onChange={onInputChange}
            />
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

// {
//     "UserId": 0,
//     "Name": "string",
//     "MiddleName": "string",
//     "LastName": "string",
//     "Email": "string",
//     "Password": "string"
//   }
// https://192.168.1.44:45455/Registration
