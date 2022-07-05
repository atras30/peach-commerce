import React, {useContext, useEffect, useLayoutEffect} from "react";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export default function ProfileHeader() {
  const {authenticatedUser} = useContext(UserContext);

  return (
    <div className="profile-header d-flex justify-content-between align-items-center">      
      <Link to="/">
        <img className="profile-brand" src={require("../../assets/img/profile_navbar_brand.png")} alt="Profile Brand" />
      </Link>

      <div className="profile-peach-coin-wrapper gap-2 d-flex align-items-center">
        <img className="peach-coin-logo" src={require("../../assets/img/peach_coin_logo.png")} alt="Peach Coin Logo" />

        <div className="peach-coin-description d-flex flex-column align-items-center">
          <div className="peach-coin-amount">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.peach_coin}</div>

          <div className="peach-coin-description">Peach Coin</div>
        </div>

        <ProfileButton />
      </div>
    </div>
  );
}
