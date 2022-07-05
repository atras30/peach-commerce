import React, { useContext, useEffect, useLayoutEffect} from "react";
import {Link} from "react-router-dom";
import { UserContext } from "../App";
import "../assets/css/profile_button.css";

export default function ProfileButton() {
  const {authenticatedUser} = useContext(UserContext);
  const {handleLogout} = useContext(UserContext);  

  useEffect(() => {
    console.log(authenticatedUser);
  },[authenticatedUser])

  return (
    <div className="dropdown">
      <button className="profile-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-123"></i> {authenticatedUser ? authenticatedUser.first_name : "Fetching Data..."}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link to="/user/profile" className="dropdown-item">
              Profile
          </Link>
        </li>
        <li>
          <Link to="/user/product" className="dropdown-item">
              Your Products
          </Link>
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
