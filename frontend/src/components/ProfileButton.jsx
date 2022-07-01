import React from "react";
import { useEffect } from "react";

export default function ProfileButton({ handleLogout, authenticatedUser }) {
  function logout() {
    handleLogout();
  }

  function handleProfileDropdown() {}

  useEffect(() => {
    console.log(authenticatedUser)
  },[]);

  return (
    <div className="dropdown">
      <button className="profile-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Welcome, {authenticatedUser.first_name}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a className="dropdown-item" href="#">
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Your Products
          </a>
        </li>
        <li><hr className="dropdown-divider"/></li>
        <li>
          <button onClick={handleLogout} className="dropdown-item" href="#">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
