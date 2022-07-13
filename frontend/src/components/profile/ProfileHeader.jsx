import React from "react";
import ProfileButton from "../template/header/ProfileButton";
import {Link} from "react-router-dom";
import {useUserContext} from "../../provider/ContextProvider";

export default function ProfileHeader() {
  const {authenticatedUser} = useUserContext();

  return (
    <div class="navbar navbar-expand-md navbar-light px-5 shadow-sm">
      <Link to="/" className="profile-img-logo-wrapper p-0 m-0 navbar-brand">
        <img className="profile-navbar-brand m-0 p-0" src={require("../../assets/img/profile_navbar_brand.png")} alt="Peach Commerce Profile" />
      </Link>

      <button class="navbar-toggler shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex align-items-center ms-auto gap-3 navbar-collapse-container">
          <div className="profile-peach-coin-wrapper gap-3 d-flex align-items-center">
            <img className="peach-coin-logo" src={require("../../assets/img/peach_coin_logo.png")} alt="Peach Coin Logo" />

            <div className="peach-coin-description d-flex flex-column align-items-center">
              <div className="peach-coin-amount">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.peach_coin}</div>

              <div className="peach-coin-description">Peach Coin</div>
            </div>

            <ProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}
