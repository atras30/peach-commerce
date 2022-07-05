import axios from "axios";
import React, {useContext, useRef} from "react";
import Cookies from "universal-cookie";
import {UserContext} from "../App";
import Swal from "sweetalert2"
import "../assets/css/FormInformationContainer.css";

export default function FormInformationContainer({toggleIsEditing}) {
  const {authenticatedUser} = useContext(UserContext);
  const cookies = new Cookies();

  //Toast SWAL Configuration
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
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

      Toast.fire({
        icon: "success",
        title: "User successfully updated!",
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-information-container rounded bg-white w-100 p-3 position-relative">
      <img onClick={toggleIsEditing} className="edit-batch-button position-absolute" type="button" src={require("../assets/img/edit_button_2.png")} alt="Edit Button" />

      <div class="mb-3 form-wrapper">
        <label for="formGroupExampleInput" class="form-label">
          First Name
        </label>
        <input class="form-control" ref={inputFirstName} type="text" name="first_name" defaultValue={authenticatedUser.first_name} />
      </div>

      <div class="mb-3 form-wrapper">
        <label for="formGroupExampleInput" class="form-label">
          Last Name
        </label>
        <input class="form-control" ref={inputLastName} type="text" name="last_name" defaultValue={authenticatedUser.last_name} />
      </div>

      <div class="mb-3 form-wrapper">
        <label for="formGroupExampleInput" class="form-label">
          Username
        </label>
        <input class="form-control" ref={inputUsername} type="text" name="username" defaultValue={authenticatedUser.username} />
      </div>

      <div class="mb-3 form-wrapper">
        <label for="formGroupExampleInput" class="form-label">
          Email
        </label>
        <input class="form-control" ref={inputEmail} type="text" name="email" defaultValue={authenticatedUser.email} />
      </div>

      <div class="mb-3 form-wrapper">
        <label for="formGroupExampleInput" class="form-label">
          Nomor Telepon
        </label>
        <input class="form-control" ref={inputPhoneNumber} type="text" name="phone_number" defaultValue={authenticatedUser.phone_number} />
      </div>

      <div class="mb-3 form-wrapper">
        <label for="formGroupExampleInput" class="form-label">
          Alamat Utama
        </label>
        <input class="form-control" ref={inputAddress} type="text" name="address" defaultValue={authenticatedUser.address} />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
