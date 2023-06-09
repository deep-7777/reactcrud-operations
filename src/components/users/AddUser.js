import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    contactNo: "",
    address: "",
    hobbies: "",
    profile: "static_value_here",
    gender: ""
  });

  const { name, password, email, contactNo, address, hobbies, profile, gender } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (user) => {
    try {
      // Your API request to add user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addUser(user);
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({ ...prevUser, profile: file }));
  };

  const ongenInputChange = (e) => {
    if (e.target.type === "radio") {
      setUser({ ...user, gender: e.target.value });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container">
      <div className="w-50 mx-auto shadow p-5" >
        <h2 className="mb-4">Add A User</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputname" className="form-label">
              <h4>Name</h4>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h4>Email Address</h4>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              <h4>Password</h4>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputContactNo" className="form-label">
              <h4>ContactNo</h4>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Phone Number"
              name="contactNo"
              value={contactNo}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              <h4>Address</h4>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Address"
              name="address"
              value={address}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputHobbies" className="form-label">
              <h4>Hobbies</h4>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Hobbies"
              name="hobbies"
              value={hobbies}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">
              <h4>Profile</h4>
            </label>
            <input
              type="file"
              name="profile"
              className="form-control"
              id="customFile"
              onChange={onFileInputChange}
            />
          </div>

          <div className="form-check mb-3">
            <h3>Gender</h3>
            <input
              className="form-check-input"
              type="radio"
              value="Male"
              onChange={ongenInputChange}
              name="gender"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Male
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              value="Female"
              onChange={ongenInputChange}
              name="gender"
              id="flexRadioDefault2"
              checked={user.gender === "Female"}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              value="Other"
              onChange={ongenInputChange}
              name="gender"
              id="flexRadioDefault3"
              checked={user.gender === "Other"}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              Other
            </label>
          </div>

          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
