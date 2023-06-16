import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const EditUser = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    Name: "",
    Password: "",
    Email: "",
    ContactNo: "",
    Address: "",
    Hobbies: "",
    Profile: "",
    Gender: ""

  });
  console.log(user)
  const { Id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
      try {
      const token_data = localStorage.getItem("token");
      const ID_data = localStorage.getItem("Id");
      console.log("********",ID_data)
      debugger;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`,
      };
        const response = await fetch(`http://192.168.1.44:45455/Student/GetStudentById/${ID_data}`,{
        headers: headers
      });
        // const response = await fetch(`https://192.168.1.44/Student/GetStudentById/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.Employee);
          console.log(data);
        } else {
          console.error("Error fetching user:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

  const Name = user?.Name || "";
  const Password = user?.Password || "";
  const Email = user?.Email || "";
  const ContactNo = user?.ContactNo || "";
  const Address = user?.Address || "";
  const Hobbies = user?.Hobbies || "";
  const Profile = user?.Profile || "";
  const Gender = user?.Gender || "";

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editUser = async () => {
  // const history = useHistory();

    try {
      const token_data = localStorage.getItem("token");
      const Id = localStorage.getItem("Id");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`,
      };
      
      const updatedUser = {
        Name: user.Name,
        Password: user.Password,
        Email: user.Email,
        ContactNo: user.ContactNo,
        Address: user.Address,
        Hobbies: user.Hobbies,
        Profile: user.Profile,
        Gender: user.Gender,
      };
  
      const response = await fetch(
        `http://192.168.1.44:45455/Student/UpdateStudent/${Id}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(updatedUser), // Pass the updated user data in the request body
        }
      );
  
      if (response.ok) {
        console.log("User updated successfully!");
        history.replace('/');

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
    setUser(prevUser => ({ ...prevUser, Profile: file }));
  };

  const onGenInputChange = e => {
    if (e.target.type === 'radio') {
      setUser({   ...user, Gender: e.target.value });
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
              <h5>Name</h5>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="Name"
              value={Name}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h5>Email Address</h5>
            </label>
            <input
              type="Email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="Email"
              value={Email}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword" className="form-label">
              <h5>Password</h5>
            </label>
            <input
              type="Password"
              className="form-control form-control-lg"
              placeholder="Enter Your Password"
              name="Password"
              value={Password}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputContactNo" className="form-label">
              <h5>ContactNo</h5>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="contactNo"
              value={ContactNo}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputAddress" className="form-label">
              <h5>Address</h5>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="Address"
              value={Address}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputHobbies" className="form-label">
              <h5>Hobbies</h5>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Hobbies"
              name="Hobbies"
              value={Hobbies}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="customFile">
              <h5>Profile</h5>
            </label>
            <input
              type="file"
              name="Profile"
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
              name="Gender"
              id="flexRadioDefault1"
              checked={user.Gender === 'Male'}
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
              name="Gender"
              id="flexRadioDefault2"
              checked={user.Gender === 'Female'}
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
              name="Gender"
              id="flexRadioDefault3"
              checked={user.Gender === 'Other'}
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
