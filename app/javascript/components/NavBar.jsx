import React from 'react';
import styled from 'styled-components';

const NavBar = ({ profileImage }) => {
  const handleRefresh = () => {
    window.location.reload(); // Refreshes the page
  };

  return (
    <StyledNavBar>
      <div className="nav-container">
        {/* Home Button */}
        <button className="home-button" onClick={handleRefresh}>
          Home
        </button>

        {/* Profile Circle */}
        <div className="profile-circle">
          <img src={profileImage} alt="Profile" />
        </div>
      </div>
    </StyledNavBar>
  );
};

const StyledNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .nav-container {
    display: flex;
    background-color: rgba(245, 73, 144, 0.8);
    padding: 6px 15px; /* Reduced padding */
    border-radius: 12px; /* Less rounded */
    box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px,
      rgba(245, 73, 144, 0.4) 2px 5px 10px;
    align-items: center;
    gap: 10px;
  }

  .home-button {
    background-color: blue;
    color: white;
    border: none;
    border-radius: 15px; /* Less rounded */
    padding: 6px 12px; /* Smaller padding */
    font-size: 14px; /* Slightly smaller font */
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .home-button:hover {
    transform: translateY(-2px);
  }

  .profile-circle {
    width: 30px; /* Reduced size */
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1.5px solid rgba(0, 0, 0, 0.2);
  }

  .profile-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default NavBar;
