import React, {useEffect, useState} from "react";
import Footer from "../template/footer/Footer";
import Header from "../template/header/Header";
import InformationContainer from "./InformationContainer";
import FormInformationContainer from "./FormInformationContainer";
import UserOrder from "./UserOrder";
import UserReview from "./UserReview";
import UserHistory from "./UserHistory";
import FormChangingProfilePicture from "./FormChangingProfilePicture";
import ProfilePicture from "./ProfilePicture";
import {useMiddlewareContext, useUserContext} from "../../provider/ContextProvider";
import {Link} from "react-router-dom";
import "../../assets/css/profile.css";

export default function Profile() {
  const [selectedOption, setSelectedOption] = useState("pesanan");
  const {authenticatedUser} = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingProfilePicture, setIsChangingProfilePicture] = useState(false);
  const setMiddleware = useMiddlewareContext();

  useEffect(function () {
    setMiddleware(["auth"]);
  }, []);

  const toggleIsEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  const toggleIsChangingProfilePicture = () => {
    setIsChangingProfilePicture(prevValue => !prevValue);
  }

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
    <div className="profile d-flex flex-column justify-content-between">
      <div>
        <Header include={["peach_coin"]} exclude={["form", "faq"]} navbarBrand={"profile"}/>

        <div className="profile-container d-flex justify-content-evenly gap-3">
          <div className="profile-information position-relative shadow rounded p-3 d-flex flex-column align-items-center justify-content-center">
            
            <div className="email-verify-link-container mb-2">
              {!authenticatedUser ? 
                null 
                : 
                authenticatedUser.email_verified_at == null ? 
                  <Link to="/mail/verification/resend" className="email-verify-link btn btn-primary text-white position-absolute">Verify Email</Link> 
                  : 
                  null
              }
            </div>      

            <div className="position-relative">

              {
                !isChangingProfilePicture ? 
                <ProfilePicture toggleIsChangingProfilePicture={toggleIsChangingProfilePicture}/>
                :
                <FormChangingProfilePicture/>
              }
            </div>

            <div className="profile-name fs-3">{!authenticatedUser ? "Fetching Data..." : authenticatedUser.full_name}</div>

            <div className="profile-email-verified-status-container mb-2">
              Email verified at : {!authenticatedUser ? "Fetching Data..." : authenticatedUser.email_verified_at == null ? <span className="email-verified-status alert alert-danger p-1">Not Verified yet</span> : <span className="email-verified-status alert alert-success p-1">{authenticatedUser.email_verified_at}</span>}
            </div>

            {!isEditing ? 
              <InformationContainer toggleIsEditing={toggleIsEditing} /> 
              : 
              <FormInformationContainer toggleIsEditing={toggleIsEditing} />
            }
          </div>

          <div className="profile-transaction-history rounded shadow d-flex-flex-column">
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

            <div className="selected-option w-100 h-100 d-flex justify-content-center align-items-center">{selectedOption == "pesanan" ? <UserOrder /> : null || selectedOption == "history" ? <UserHistory /> : null || selectedOption == "ulasan" ? <UserReview /> : null}</div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
