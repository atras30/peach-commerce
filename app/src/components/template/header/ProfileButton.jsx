import React from "react";
import {Link} from "react-router-dom";
import {useUserContext} from "../../../provider/ContextProvider";
import "../../../assets/css/profile_button.css";

export default function ProfileButton() {
  const {authenticatedUser, handleLogout} = useUserContext();

  return (
    <div className="dropdown profile-button-container">
      <button className="profile-button dropdown-toggle d-flex justify-content-center align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-person-circle fs-4 me-1"></i> <span>{authenticatedUser ? authenticatedUser.first_name : "Fetching Data..."}</span> 
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link to="/user/profile" className="dropdown-item">
              <i className="bi bi-person me-2"></i>Profile
          </Link>
        </li>
        <li>
          <Link to="/user/shopping-cart" className="dropdown-item">
              <i className="bi bi-cart me-2"></i>Shopping Cart
          </Link>
        </li>
        <li>
          <Link to="/user/product" className="dropdown-item">
              <i className="bi bi-cash-stack me-2"></i>Your Products
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button onClick={handleLogout} className="dropdown-item" href="#">
            <i className="bi bi-box-arrow-left me-2"></i>Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
