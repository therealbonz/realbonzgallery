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
  top: 0; /* Positions it at the top of the screen */
  left: 50%; /* Centers horizontally */
  transform: translateX(-50%);
  z-index: 1000; /* Ensures it floats above other components */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensures it spans the entire width */

  .nav-container {
    display: flex;
    background-color: rgba(245, 73, 144, 0.8);
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
      rgba(245, 73, 144, 0.5) 5px 10px 15px;
    align-items: center;
    gap: 15px; /* Space between elements */
  }

  .home-button {
    background-color: blue;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .home-button:hover {
    transform: translateY(-3px);
  }

  .profile-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white; /* Fallback color */
    border: 2px solid rgba(0, 0, 0, 0.2);
  }

  .profile-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default NavBar;
