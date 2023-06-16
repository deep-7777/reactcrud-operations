import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const AddUser = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    ContactNo: "",
    Address: "",
    Hobbies: "",
    Profile: "",
    Gender: ""
  });

  const { Name, Password, Email, ContactNo, Address, Hobbies, Profile, Gender } =
    user || {}; 

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (user) => {
    try {
      const token_data = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`,
      };

      const response = await axios.post("http://192.168.1.44:8012/Student/AddStudent",user, {
        headers: headers
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.listEmployees);
        console.log(data);
        history.replace('/');
      } else {
        console.error("Error fetching user:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addUser(user);
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({ ...prevUser, Profile: file }));
  };

  const onGenInputChange = (e) => {
    if (e.target.type === "radio") {
      setUser({ ...user, Gender: e.target.value });
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
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>Email Address</h5>
            </label>
            <input
              type="Email"
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
              type="Password"
              className="form-control"
              placeholder="Enter Your Password"
              name="Password"
              value={Password}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputContactNo" className="form-label">
              <h5>ContactNo</h5>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Phone Number"
              name="ContactNo"
              value={ContactNo}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              <h5>Address</h5>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Address"
              name="Address"
              value={Address}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputHobbies" className="form-label">
              <h5>Hobbies</h5>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Hobbies"
              name="Hobbies"  
              value={Hobbies}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">
              <h5>Profile</h5>
            </label>
            <input
              type="file"
              name="Profile"
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
              onChange={onGenInputChange}
              name="Gender"
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
              onChange={onGenInputChange}
              name="Gender"
              id="flexRadioDefault2"
              checked={user && user.Gender === "Female"} // Add null check here
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
              onChange={onGenInputChange}
              name="Gender"
              id="flexRadioDefault3"
              checked={user && user.Gender === "Other"} // Add null check here
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
