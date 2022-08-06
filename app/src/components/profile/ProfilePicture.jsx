import React from "react";
import {useUserContext} from "../../provider/ContextProvider";

export default function ProfilePicture({toggleIsChangingProfilePicture}) {
  const {authenticatedUser} = useUserContext();

  return (
    <div>
      {authenticatedUser?.profile_picture_path == null ? (
        <img className="profile-logo img-thumbnail img-fluid rounded-circle" src={require(`../../assets/img/peach_coin_logo.png`)} alt="Peach Coin Logo" />
      ) : (
        <img className="profile-logo img-thumbnail img-fluid rounded-circle" src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${authenticatedUser.profile_picture_path}`} alt="Peach Coin Logo" />
      )}
      <img onClick={toggleIsChangingProfilePicture} className="edit-button" title="Edit Profile Picture" src={require("../../assets/img/edit_button_1.png")} alt="Edit Button" />
    </div>
  );
}
