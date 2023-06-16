import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {  
    fetchUsers();    
  }, []);
// debugger
  const fetchUsers = async () => {
    try {
      const token_data = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`,
      };
// debugger
      const response = await fetch("http://192.168.1.44:45455/Student/GetAllStudent", {
        headers: headers,
      });
// debugger
      if (response.ok) {
        const data = await response.json();
        setUsers(data.listEmployees);
        console.log(data);
      } else {
        console.error("Error fetching users:", response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // debugger
  const deleteUser = async (Id) => {
    try {
      const token_data = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`,
      };
      const response = await fetch(`http://192.168.1.44:45455/Student/DeleteStudent/${Id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.status === 200) {
        console.log("User deleted successfully");
        fetchUsers(); // Refresh the user list after deletion
      } else {
        console.error("Error deleting user:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDelete = (Id) => {
    deleteUser(Id);
  };

    // Calculate indexes for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        {currentUsers.length > 0 ? (
            <> 
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr style={{ textAlign: 'center' }}>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Hobbies</th>
                <th scope="col">ContactNo</th>
                <th scope="col">Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (   
                                  
                <tr key={user.Id} >
                  <td>{user.Id}</td>
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.Address}</td>
                  <td>{user.Hobbies}</td>
                  <td>{user.ContactNo}</td>
                  <td><img src={user.profilePic} alt="Profile" style={{ width: '50px', height: '50px' }} /></td>
                  <td> 
                    <Link className="btn btn-primary mr-2" to={`/users/${user.Id}`} onClick={() => localStorage.setItem("Id", user.Id)}>
                      View 
                    </Link>
                    <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.Id}`} onClick={() => localStorage.setItem("Id", user.Id)}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.Id)}
                    > 
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <Pagination
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </>  
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
};
const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${
                currentPage === number ? "active" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Home;
