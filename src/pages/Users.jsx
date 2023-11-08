import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=50");
      setUsers(response?.data?.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const[currentPage, setCurrentPage] = useState(0); 
  const dataPerPage = 6;
  const visitedPages = currentPage * dataPerPage;
  const pageCount = Math.ceil(users?.length / dataPerPage) || 0;
  const displayedUsers = users?.length && users?.slice(visitedPages, visitedPages + dataPerPage) || [];

  const handlePageChange = ({selected}) => {
      setCurrentPage(selected);
  };

  const handleUserClicked = (user, id) => {
    dispatch(setUser(user));
    navigate(`/users/${id}`);
  };

  return (
    <>

        <h1>Hello User</h1>
        <table>
          <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Country</th>
          </tr>
                
          {displayedUsers?.map((user, idx) => (
              <tr key={user.id?.value} onClick={() => handleUserClicked(user, user.id?.value)}>
                  <td className='img-n-name'>
                  <img src={user.picture.medium} alt="user" />
                  <p>{`${user.name.title}. ${user.name.first} ${user.name.last}`}</p>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.location?.country}</td>
              </tr>
          ))}
        </table>

        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination-container"
            previousLinkClassName="prevBtn"
            nextLinkClassName="nxtBtn"
            disabledClassName="disabledBtn"
            activeClassName="activePageBtn"
            pageRangeDisplayed={2}
            marginPagesDisplayed={0}
        />
    </>
  );
};

export default Users;
