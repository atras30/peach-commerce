import React, {useEffect, useState, useRef} from "react";
import BaseLayout from "../layouts/BaseLayout";
import {useHelperContext} from "../../provider/ContextProvider";
import "../../assets/css/registration_by_google.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../template/Loading";

export default function RegistrationByGoogle() {
  const navigate = useNavigate();
  const {cookies, toast, formatErrorRequest} = useHelperContext();
  const [userInformation, setUserInformation] = useState(cookies.get("user_information"));
  const [isSigningUp, setIsSigningUp] = useState(false);

  //register useRef hook
  const inputRegisterUsername = useRef(null);
  const inputRegisterPassword = useRef(null);
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPhoneNumber = useRef(null);
  const inputAddress = useRef(null);

  function toggleIsSigningUp() {
    setIsSigningUp((value) => !value);
  }

  const handleRegisterUser = (e) => {
    e.preventDefault();

    toggleIsSigningUp();

    axios
      .post("/api/auth/register", {
        first_name: inputFirstName.current.value,
        last_name: inputLastName.current.value,
        username: inputRegisterUsername.current.value,
        email: inputEmail.current.value,
        password: inputRegisterPassword.current.value,
        phone_number: inputPhoneNumber.current.value,
        address: inputAddress.current.value,
        registered_via: "google",
      })
      .then((response) => {
        if (response.data.message === "User has been created") {
          toast.fire({
            icon: "success",
            title: `Successfully created a user, you can now login to our app!`,
          });

          cookies.set("recently_registered", true);
          navigate("/");
        }
      })
      .catch((exception) => {
        const errors = formatErrorRequest(exception.response.data.errors);
        toast.fire({
          icon: "error",
          title: `<p>Failed creating user : </p>${errors}`,
        });
        console.log(exception.response.data.errors);
      })
      .finally(() => {
        toggleIsSigningUp();
      });
  };

  useEffect(function () {
    if (!cookies.get("user_information")) {
      toast.fire({
        icon: "error",
        title: "You have no access to the page",
      });
      return navigate("/");
    }

    cookies.remove("user_information");

    toast.fire({
      icon: "info",
      title: `Please fill in the data to register to our app`,
    });
  }, []);

  return (
    <BaseLayout headerExclude={["form"]}>
      <div className="registration-by-google-container row p-4">
        <div className="form-container shadow col-6 m-auto border border-1 border-dark p-3 rounded">
          <div className="title fs-5 text-center fw-bold mb-3">
            {/* Looks like your account is not registered yet, please fill in the form first to continue any further */}
            Register User
          </div>

          <form onSubmit={handleRegisterUser}>
            <div className="mb-3">
              <label htmlFor="input-first-name" className="form-label fw-bold">
                First Name
              </label>
              <input ref={inputFirstName} type="text" className="form-input" defaultValue={userInformation?.first_name} />
            </div>
            <div className="mb-3">
              <label htmlFor="input-last-name" className="form-label fw-bold">
                Last Name
              </label>
              <input ref={inputLastName} type="text" className="form-input" defaultValue={userInformation?.last_name} />
            </div>
            <div className="mb-3">
              <label htmlFor="input-username" className="form-label fw-bold">
                Username
              </label>
              <input ref={inputRegisterUsername} type="text" className="form-input" />
            </div>
            <div className="mb-3">
              <label htmlFor="input-email" className="form-label fw-bold">
                Email
              </label>
              <input ref={inputEmail} type="email" className="form-input" defaultValue={userInformation?.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="input-password" className="form-label fw-bold">
                Password
              </label>
              <input ref={inputRegisterPassword} type="password" className="form-input" />
            </div>

            <div className="mb-3">
              <label htmlFor="input-phone-number" className="form-label fw-bold">
                Phone Number
              </label>
              <input ref={inputPhoneNumber} type="text" className="form-input" />
            </div>

            <div className="mb-3">
              <label htmlFor="input-address" className="form-label fw-bold">
                Address
              </label>
              <input ref={inputAddress} type="text" className="form-input" />
            </div>

            {!isSigningUp ? (
              <button type="submit" className="register" onClick={handleRegisterUser}>
                Submit
              </button>
            ) : (
              <Loading description={"Registering your account"} />
            )}
          </form>
        </div>
      </div>
    </BaseLayout>
  );
}
