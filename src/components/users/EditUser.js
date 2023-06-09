import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    contactNo: "",
    address: "",
    hobbies: "",
    profile: "",
    gender: ""

  });
  console.log(user)
  const { id } = useParams();

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`https://192.168.1.44/Student/GetStudentById/${id}`);
      // const response = await fetch(`https://192.168.1.44/Student/GetStudentById/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.employee);
        console.log(data);
      } else {
        console.error("Error fetching user:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const name = user?.name || "";
  const password = user?.password || "";
  const email = user?.email || "";
  const contactNo = user?.contactNo || "";
  const address = user?.address || "";
  const hobbies = user?.hobbies || "";
  const profile = user?.profile || "";
  const gender = user?.gender || "";

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editUser = async (user) => {
    debugger;
    try {
      const response = await fetch(`https://192.168.1.44/Student/UpdateStudent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        console.log("User updated successfully!");
      } else {
        console.error("Error updating user:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await editUser(user);
  };

  const onFileInputChange = e => {
    const file = e.target.files[0];
    setUser(prevUser => ({ ...prevUser, profile: file }));
  };

  const onGenInputChange = e => {
    if (e.target.type === 'radio') {
      setUser({ ...user, gender: e.target.value });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  if (user === null) {
    return <div>Loading user data...</div>;
  }
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="mb-4">Edit User</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputname" className="form-label">
              <h4>Name</h4>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h4>Email Address</h4>
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword" className="form-label">
              <h4>Password</h4>
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputContactNo" className="form-label">
              <h4>ContactNo</h4>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="contactNo"
              value={contactNo}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputAddress" className="form-label">
              <h4>Address</h4>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="address"
              value={address}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputHobbies" className="form-label">
              <h4>Hobbies</h4>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Hobbies"
              name="hobbies"
              value={hobbies}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="customFile">
              <h4>Profile</h4>
            </label>
            <input
              type="file"
              name="profile"
              className="form-control"
              id="customFile"
              onChange={e => onFileInputChange(e)}
            />
          </div>

          <div className="form-check">
            <h3>Gender</h3>
            <input
              className="form-check-input"
              type="radio"
              value="Male"
              onChange={e => onGenInputChange(e)}
              name="gender"
              id="flexRadioDefault1"
              checked={user.gender === 'Male'}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Male
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Female"
              onChange={e => onGenInputChange(e)}
              name="gender"
              id="flexRadioDefault2"
              checked={user.gender === 'Female'}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Other"
              onChange={e => onGenInputChange(e)}
              name="gender"
              id="flexRadioDefault3"
              checked={user.gender === 'Other'}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              Other
            </label>
          </div>

          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
