import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    address: ""
  });
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`https://192.168.1.44/Student/GetStudentById/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.employee); // Update to set user state with employee data
        console.log(data.employee);
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
      <h1 className="display-4">User ID: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Password: {user.password}</li>
        <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Phone: {user.contactNo}</li>
        <li className="list-group-item">Address: {user.address}</li>
      </ul>
    </div>
  );
};

export default User;
