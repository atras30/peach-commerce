import React, {useEffect, useState} from "react";
import Footer from "../template/footer/Footer";
import ProfileHeader from "./ProfileHeader";
import InformationContainer from "./InformationContainer";
import FormInformationContainer from "./FormInformationContainer";
import UserOrder from "./UserOrder";
import UserReview from "./UserReview";
import UserHistory from "./UserHistory";
import "../../assets/css/profile.css";
import {useUserContext} from "../../provider/ContextProvider";
import {useMiddlewareContext} from "../../provider/ContextProvider";

export default function Profile() {
  const [selectedOption, setSelectedOption] = useState("pesanan");
  const {authenticatedUser} = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const setMiddleware = useMiddlewareContext();

  useEffect(function() {
    setMiddleware(['auth']);
  }, []);

  const toggleIsEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  const changeSelected = (e) => {
    const selectedText = e.target.textContent.toLowerCase();

    setSelectedOption(selectedText);

    let choices = document.querySelectorAll(".choices-item");
    choices.forEach((choice) => {
      choice.classList.remove("active");
      choice.classList.remove("shadow-sm");
    });

    let chosenChoice = [...choices].find((choice) => choice.textContent.toLowerCase() === selectedText);

    chosenChoice.classList.add("active");
    chosenChoice.classList.add("shadow-sm");
  };

  const changeSelectedDropdown = (e) => {
    const selectedText = e.target.value.toLowerCase();

    setSelectedOption(selectedText);

    let choices = document.querySelectorAll(".choices-item");
    choices.forEach((choice) => {
      choice.classList.remove("active");
      choice.classList.remove("shadow-sm");
    });

    let chosenChoice = [...choices].find((choice) => choice.textContent.toLowerCase() === selectedText);

    chosenChoice.classList.add("active");
    chosenChoice.classList.add("shadow-sm");
  };

  return (
    <div className="profile">
      <ProfileHeader />

      <div className="profile-container mt-4 d-flex justify-content-evenly gap-3 px-5">
        <div className="profile-information shadow-sm rounded p-3 d-flex flex-column align-items-center justify-content-center">
          <div className="position-relative">
            <img className="profile-logo img-thumbnail img-fluid rounded-circle" src={require("../../assets/img/peach_coin_logo.png")} alt="Peach Coin Logo" />
            <img className="edit-button" title="Edit Profile Picture" src={require("../../assets/img/edit_button_1.png")} alt="Edit Button" />
          </div>

          <div className="profile-name fs-3">{authenticatedUser && authenticatedUser.full_name}</div>

          {!isEditing ? <InformationContainer toggleIsEditing={toggleIsEditing} /> : <FormInformationContainer toggleIsEditing={toggleIsEditing} />}
        </div>

        <div className="profile-transaction-history rounded shadow-sm d-flex-flex-column">
          <div className="choices d-flex justify-content-between px-5 noselect shadow-sm align-items-stretch">
            <div className="choices-item fs-4 rounded shadow-sm active" onClick={changeSelected}>
              Pesanan
            </div>

            <div className="choices-item fs-4 rounded" onClick={changeSelected}>
              ulasan
            </div>

            <div className="choices-item fs-4 rounded" onClick={changeSelected}>
              History
            </div>
          </div>

          <select onChange={changeSelectedDropdown} className="form-select choices-dropdown rounded-top d-none text-center fs-5 fw-bold" aria-label="Default select example">
            <option>Pesanan</option>
            <option>Ulasan</option>
            <option>History</option>
          </select>

          <div className="selected-option w-100 h-100 d-flex justify-content-center align-items-center">
            {
              selectedOption == "pesanan" ? <UserOrder /> : null || 
              selectedOption == "history" ? <UserHistory /> : null || 
              selectedOption == "ulasan" ? <UserReview /> : null
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
