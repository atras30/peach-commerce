import React, {useContext, useEffect} from "react";
import {UserContext} from "../../App";

export default function InformationContainer({toggleIsEditing}) {
  const {authenticatedUser} = useContext(UserContext);

  return (
    <div className="information-container rounded shadow bg-white w-100 p-3 position-relative">
      <img onClick={toggleIsEditing} className="edit-batch-button position-absolute" type="button" src={require("../../assets/img/edit_button_2.png")} alt="Edit Button" />

      <div className="mb-2 username">
        <span className="username-description">Username : </span>
        <span className="user-username">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.username}</span>
      </div>

      <div className="mb-2 email">
        <span className="email-description">Email : </span>
        <span className="user-email">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.email}</span>
      </div>

      <div className="mb-2 phone-number">
        <span className="phone-number-description">Nomor Telepon : </span>
        <span className="user-phone-number">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.phone_number}</span>
      </div>

      <div className="mb-2 address">
        <span className="address-description">Alamat Utama : </span>
        <span className="user-address">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.address}</span>
      </div>
    </div>
  );
}
