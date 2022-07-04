import React from "react";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import "../assets/css/profile_button.css";

export default function ProfileButton({handleLogout, authenticatedUser}) {
  return (
    <div className="dropdown">
      <button className="profile-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Welcome, {authenticatedUser.first_name}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link to="/user/profile">
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </Link>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Your Products
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button onClick={handleLogout} className="dropdown-item" href="#">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
