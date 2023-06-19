import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    fetchUsers();
  }, [currentPage,searchText]);

 const fetchUsers = async () => {
  try {
    const token_data = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token_data}`,
    };
    let response;
    if (searchText === "") {
      debugger
      response = await fetch(
        `http://192.168.1.44:45455/Student/GetPaginatedStudentData?pageNumber=${currentPage}&pageSize=${usersPerPage}`,
        {
          headers: headers,
        }
      );
    } else {
      debugger
      const int_id = parseInt(searchText) 
      response = await fetch(`http://192.168.1.44:45455/Student/GetStudentById/${int_id}` ,{
          headers: headers,
        }
      );
    }

    if (response.ok) {
      const data = await response.json();
      if(searchText != ''){
        setUsers([data.Employee])
      }else{
      setUsers(data.listEmployees);
    }
      setTotalCount(data.TotalCount);
      console.log(data);
    } else {
      console.error("Error fetching users:", response.status);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
  const deleteUser = async (Id) => {
    try {
      const token_data = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_data}`,
      };
      const response = await fetch(
        `http://192.168.1.44:45455/Student/DeleteStudent/${Id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log("User deleted successfully");
        fetchUsers();
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when performing a search
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };
  
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <button className="btn btn-primary ml-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        {users.length > 0 ? (
          <>
            <table className="table border shadow">
              <thead className="thead-dark">
                <tr style={{ textAlign: "center" }}>
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
                {users.map((user) => (
                  <tr key={user.Id}>
                    <td>{user.Id}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Address}</td>
                    <td>{user.Hobbies}</td>
                    <td>{user.ContactNo}</td>
                    <td>
                      <img
                        src={user.Profile}
                        alt="Profile"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary mr-2"
                        to={`/users/${user.Id}`}
                        onClick={() =>
                          localStorage.setItem("Id", user.Id)
                        }
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mr-2"
                        to={`/users/edit/${user.Id}`}
                        onClick={() =>
                          localStorage.setItem("Id", user.Id)
                        }
                      >
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
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={usersPerPage}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
