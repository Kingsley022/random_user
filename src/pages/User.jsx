import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedUser = useSelector((state) => state.user);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    if (!id || !storedUser) {
      navigate('/');
    }
  }, [id, navigate]);

  return (
    <div className="container">
      <div className="user-container">
        <img src={storedUser?.picture.large} alt="" />
        <p>{`${storedUser?.name.title}. ${storedUser?.name.first} ${storedUser?.name.last}`}</p>
        <p>Email Address: {storedUser?.email}</p>
        <p>Data of Birth: {formatDate(storedUser?.dob.date)}</p>
        <p>Gender: {storedUser?.gender}</p>
        <p>Country: {storedUser?.location.country}</p>
      </div>
    </div>
  );
};

export default User;
