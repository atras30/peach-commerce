import axios from "axios";
import React, {useRef} from "react";
import Cookies from "universal-cookie";
import {useHelperContext, useUserContext} from "../../provider/ContextProvider";
import Swal from "sweetalert2";
import "../../assets/css/FormInformationContainer.css";

export default function FormInformationContainer({toggleIsEditing}) {
  const {authenticatedUser, setAuthenticatedUser} = useUserContext();
  const {formatErrorRequest, cookies} = useHelperContext();

  //Toast SWAL Configuration
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const inputUsername = useRef(null);
  const inputEmail = useRef(null);
  const inputPhoneNumber = useRef(null);
  const inputAddress = useRef(null);
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.put(
        `/api/users/${authenticatedUser.id}`,
        {
          username: inputUsername.current.value,
          email: inputEmail.current.value,
          phone_number: inputPhoneNumber.current.value,
          address: inputAddress.current.value,
          first_name: inputFirstName.current.value,
          last_name: inputLastName.current.value,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
            Accept: "application/json",
          },
        }
      );

      setAuthenticatedUser(response.data.user);

      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (exception) {
      let errors = exception.response.data.errors;
      let errorList = formatErrorRequest(errors);

      Toast.fire({
        icon: "error",
        title: `<p>Update Failed :</p>${errorList}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-information-container shadow rounded bg-white w-100 p-4 position-relative">
      <img onClick={toggleIsEditing} className="edit-batch-button position-absolute" type="button" src={require("../../assets/img/edit_button_2.png")} alt="Edit Button" />

      <div className="mb-3 form-wrapper">
        <label htmlFor="formGroupExampleInput" className="form-label">
          First Name
        </label>
        <input className="form-control shadow-sm" ref={inputFirstName} type="text" name="first_name" defaultValue={authenticatedUser.first_name} />
      </div>

      <div className="mb-3 form-wrapper">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Last Name
        </label>
        <input className="form-control shadow-sm" ref={inputLastName} type="text" name="last_name" defaultValue={authenticatedUser.last_name} />
      </div>

      <div className="mb-3 form-wrapper">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Username
        </label>
        <input className="form-control shadow-sm" ref={inputUsername} type="text" name="username" defaultValue={authenticatedUser.username} />
      </div>

      <div className="mb-3 form-wrapper">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Email
        </label>
        <input className="form-control shadow-sm" ref={inputEmail} type="text" name="email" defaultValue={authenticatedUser.email} />
      </div>

      <div className="mb-3 form-wrapper">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Nomor Telepon
        </label>
        <input className="form-control shadow-sm" ref={inputPhoneNumber} type="text" name="phone_number" defaultValue={authenticatedUser.phone_number} />
      </div>

      <div className="mb-3 form-wrapper">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Alamat Utama
        </label>
        <input className="form-control shadow-sm" ref={inputAddress} type="text" name="address" defaultValue={authenticatedUser.address} />
      </div>

      <button type="submit" className="btn update-button shadow-sm">
        Update Information!
      </button>
    </form>
  );
}
