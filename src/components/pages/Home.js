import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from 'axios';
import Swal from 'sweetalert2';


const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState(""); // State to track the current sort key
  const [sortOrder, setSortOrder] = useState("asc");


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
      response = await fetch(
        `http://192.168.1.44:45455/Student/GetPaginatedStudentData?pageNumber=${currentPage}&pageSize=${usersPerPage}`,
        {
          headers: headers,
        }
      );
    } else {
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

  const handleExportClick = () => {
    const token_data = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token_data}`,
    };
  
    fetch('http://192.168.1.44:45455/Student/ExportExcelAllData', {
      headers: headers,
    })
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error('API call failed');
          // Handle errors or display an error message
        }
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
  
        Swal.fire({
          icon: 'success',
          title: 'Successfully!',
          text: 'Export all page data download completed!',
        });
      })
      .catch(error => {
        console.error('API call failed');
        // Handle errors or display an error message
      });
  };
  
  const handleExportClickcurrent = () => {
    const token_data = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token_data}`,
    };
  
    fetch(`http://192.168.1.44:45455/Student/ExportExcelCurrentPage?pageNumber=${currentPage}&pageSize=${usersPerPage}`, {
      headers: headers,
    })
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error('API call failed');
          // Handle errors or display an error message
        }
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
  
        Swal.fire({
          icon: 'success',
          title: 'Successfully!',
          text: 'Current Data page download completed!',
        });
      })
      .catch(error => {
        console.error('API call failed');
        // Handle errors or display an error message
      });
  };
  

  const onFileInputChange = (event) => {
    const file = event.target.files[0];
    const token_data = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token_data}`,
    };
  
    const formData = new FormData();
    formData.append('file', file);
  
    axios
      .post('http://192.168.1.44:45455/Student/ImportFile', formData, { headers: headers })
      .then(response => {
        console.log('API call successful');
        // Handle the response if needed
        Swal.fire({
          icon: 'success',
          title: 'Successfully!',
          text: 'File uploaded successfully!',
        });
      })
      .catch(error => {
        console.error('API call failed');
        // Handle errors or display an error message
      });
  };
  const handleSortClick = (key) => {
    if (sortKey === key) {
      // If the same key is clicked again, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different key is clicked, set the new sort key and default sort order to ascending
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  const sortedUsers = users.sort((a, b) => {
    // Sort the users array based on the sort key and sort order
    if (sortKey === "id") {
      return sortOrder === "asc" ? a.Id - b.Id : b.Id - a.Id;
    } else if (sortKey === "name") {
      return sortOrder === "asc" ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name);
    }
    // If no sort key is set, return the original order of users
    return 0;
  });
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <div className="mb-3">
          <input type="text" placeholder="Search by name..." value={searchText} onChange={handleSearchInputChange}/>
          <button className="btn btn-primary ml-2" onClick={handleSearch}> Search </button>
          <div className="form-group mb-3" style={{ width: '25%' }}>
          <label className="form-label"></label>
          <input
            type="file"
            name="Profile"
            className="form-control"
            id="customFile"
            onChange={onFileInputChange}
          />
        </div>
        </div>
        {users.length > 0 ? (
          <>
            <table className="table border shadow">
              <thead className="thead-dark">
                <tr style={{ textAlign: "center" }}>
                <th scope="col">
                <button className="btn btn-link" onClick={() => handleSortClick("id")}>
                  Id
                </button>
              </th>
              <th scope="col">
                <button className="btn btn-link" onClick={() => handleSortClick("name")}>
                  Name
                </button>
              </th>
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
                        src={`http://192.168.1.44:45455/Student/ImagePath/${user.Profile}`}
                        alt="Profile"
                        style={{ width: "60px", height: "60px", borderRadius:"40px" }}
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
            <div className="text-right">
            <button type="button" className="btn btn-primary mr-1" onClick={handleExportClickcurrent}>
              Export
            </button>
              <button type="button" className="btn btn-primary" onClick={handleExportClick}>
                Export All
              </button>

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
