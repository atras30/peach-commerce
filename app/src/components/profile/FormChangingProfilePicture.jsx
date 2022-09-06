import axios from "axios";
import React, {useRef} from "react";
import {useHelperContext, useUserContext} from "../../provider/ContextProvider";

export default function FormChangingProfilePicture({toggleIsChangingProfilePicture}) {
  const inputProfilePicture = useRef(null);
  const {getLoggedInUser} = useUserContext();
  const {cookies, toast} = useHelperContext();

  const handleEditProfilePicture = (e) => {
    e.preventDefault();
    const profilePicture = inputProfilePicture.current.files[0];
    const url = "api/users/profile-picture";
    const payload = {
      profile_picture: profilePicture,
    };
    const config = {
      headers: {
        Authorization: cookies.get("Authorization"),
        "Content-Type": "multipart/form-data",
      },
    };

    const id = toast.loading("Please wait...");

    let changeProfilePromise = axios.post(url, payload, config);

    changeProfilePromise
      .then(async () => {
        await getLoggedInUser();
        toggleIsChangingProfilePicture();

        return toast.update(id, {render: "Profile picture successfully been changed", type: "success", isLoading: false,autoClose: 3000, closeOnClick: true});
      })
      .catch((error) => {
        return toast.update(id, {render: error.response.data.errors.profile_picture[0],type: "error", isLoading: false, autoClose: 3000, closeOnClick: true});
      });
  };

  return (
    <div>
      <form action="#" onSubmit={handleEditProfilePicture}>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            <strong>Please Select a file</strong>
          </label>
          <input ref={inputProfilePicture} className="form-control" type="file" id="formFile" />
          <button onClick={handleEditProfilePicture} type="submit" className="loginbutton w-100 h-auto">
            Change Profile Picture
          </button>
        </div>
      </form>
    </div>
  );
}
