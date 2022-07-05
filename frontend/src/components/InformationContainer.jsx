import React from "react";

export default function InformationContainer({toggleIsEditing}) {
  return (
    <div className="information-container rounded bg-white w-100 p-3 position-relative">
      <img onClick={toggleIsEditing} className="edit-batch-button position-absolute" type="button" src={require("../assets/img/edit_button_2.png")} alt="Edit Button" />

      <div className="mb-2 username">
        <span className="username-description">Username : </span>
        <span className="user-username">Atras Shalhan</span>
      </div>

      <div className="mb-2 email">
        <span className="email-description">Email : </span>
        <span className="user-email">atrasshalhan@gmail.com</span>
      </div>

      <div className="mb-2 phone-number">
        <span className="phone-number-description">Nomor Telepon : </span>
        <span className="user-phone-number">081287318166</span>
      </div>

      <div className="mb-2 address">
        <span className="address-description">Alamat Utama : </span>
        <span className="user-address">VMP C5/14</span>
      </div>
    </div>
  );
}
