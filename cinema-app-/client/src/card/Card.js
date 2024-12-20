import React from 'react';
import { Link } from 'react-router-dom';  

const Card = ({ userInfo, onLogout, onManageAccount }) => {
  return (
    <div className="card">
      <p>Username: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>
      <Link to="/manage">
        <p className='pp'>Manage Account</p> {}
      </Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Card;
