import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState(null);
  const { Id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    // debugger
    try {
      const token_data = localStorage.getItem("token");
      const ID_data = localStorage.getItem("Id");
      console.log("********",ID_data)
      // debugger
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`
      };
      // debugger
      const response = await fetch(
        `http://192.168.1.44:45455/Student/GetStudentById/${ID_data}`,
        {
          headers: headers
        }
      );
// debugger
      if (response.ok) {
        const data = await response.json();
        setUser(data.Employee); // Update to match the structure of the response
        // console.log(data.Employee);
      } else {
        console.log("Error fetching user:", response.status);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
      <h1 className="display-4">User ID: {Id}</h1>
      <hr />
      {user ? (
        <ul className="list-group w-50">
          <li className="list-group-item">Name: {user.Name}</li>
          <li className="list-group-item">Hobbies: {user.Hobbies}</li>
          <li className="list-group-item">Email: {user.Email}</li>
          <li className="list-group-item">Phone: {user.ContactNo}</li>
          <li className="list-group-item">Address: {user.Address}</li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;
