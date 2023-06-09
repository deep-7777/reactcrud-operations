  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  // import axios from "axios";

  const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://192.168.1.44/Student/GetAllStudent");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.listEmployees);
        } else {
          console.error("Error fetching users:", response.status);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    const deleteUser = async () => {
      debugger;
      try {
        await fetch("https://192.168.1.44/Student/DeleteStudent/${id}", {
          method: "DELETE",
        });
        fetchUsers(); // Refresh the user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    

  
    return (
      <div className="container">
        <div className="py-4">
          <h1>Home Page</h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>

                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Hobbies</th>
                <th scope="col">contactNo</th>


                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (                            
                <tr key={user.id} >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.hobbies}</td>
                  <td>{user.contactNo}</td>
                  <td>
                    <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                      View
                    </Link>
                    <Link class="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>
                      Edit
                    </Link>
                    <button
                    className="btn btn-danger"
                    onClick={(event) => deleteUser(user.id, event)}
                  >
                    Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default Home;

