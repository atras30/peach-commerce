import React, {useEffect, useState, useContext} from "react";
import Footer from "./Footer";
import ProfileHeader from "./ProfileHeader";
import InformationContainer from "./InformationContainer";
import FormInformationContainer from "./FormInformationContainer";
import "../assets/css/profile.css";
import { UserContext } from "../App";

export default function Profile() {
  const {authenticatedUser} = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!authenticatedUser) window.location.href = "/";
  }, []);

  const toggleIsEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  return (
    <div className="profile">
      <ProfileHeader />

      <div className="profile-container mt-4 d-flex justify-content-evenly gap-3 px-5">
        <div className="profile-information rounded p-3 d-flex flex-column align-items-center justify-content-center">
          <div className="position-relative">
            <img className="profile-logo img-thumbnail img-fluid rounded-circle" src={require("../assets/img/peach_coin_logo.png")} alt="Peach Coin Logo" />
            <img className="edit-button" title="Edit Profile Picture" src={require("../assets/img/edit_button_1.png")} alt="Edit Button" />
          </div>

          <div className="profile-name fs-3">Atras Shalhan</div>

          {!isEditing ? <InformationContainer toggleIsEditing={toggleIsEditing} /> : <FormInformationContainer toggleIsEditing={toggleIsEditing} />}
        </div>

        <div className="profile-transaction-history rounded d-flex-flex-column">
          <div className="choices d-flex justify-content-between px-5">
            <div className="choices-item fs-4">Pesanan</div>

            <div className="choices-item fs-4">ulasan</div>

            <div className="choices-item fs-4">History</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
