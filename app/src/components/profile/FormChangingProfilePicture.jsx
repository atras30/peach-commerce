import axios from "axios";
import React, {useRef} from "react";
import { useHelperContext, useUserContext } from "../../provider/ContextProvider";

export default function FormChangingProfilePicture({toggleIsChangingProfilePicture}) {
  const inputProfilePicture = useRef(null);
  const {getLoggedInUser} = useUserContext();
  const {cookies, formatErrorRequest, toast} = useHelperContext();

  const handleEditProfilePicture = (e) => {
    e.preventDefault();
    const profilePicture = inputProfilePicture.current.files[0];
    const url = "api/users/profile-picture";
    const payload = {
      profile_picture: profilePicture
    };
    const config = {
      headers: {
        Authorization: cookies.get("Authorization"),
        "Content-Type": "multipart/form-data"
      }
    };
    
    axios.post(url, payload, config)
      .then(async () => {
        await getLoggedInUser();
        toggleIsChangingProfilePicture();
        
        return toast.fire({
          icon: "success",
          title: `Profile picture successfully been changed`
        })
      })
      .catch((error) => {
        console.log(error)
        return toast.fire({
          icon: "error",
          title: `<p>Failed changing new profile picture : </p>${formatErrorRequest(error.response.data.errors)}`
        })
      })
  };

  return (
    <div>
      <form action="#" onSubmit={handleEditProfilePicture}>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            <strong>Please Select a file</strong>
          </label>
          <input ref={inputProfilePicture} className="form-control" type="file" id="formFile" />
          <button onClick={handleEditProfilePicture} type="submit" className="loginbutton w-100 h-auto">Change Profile Picture</button>
        </div>
      </form>
    </div>
  );
}
