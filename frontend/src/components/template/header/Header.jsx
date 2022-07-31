//import data
import React, {useRef, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useUserContext, useHelperContext} from "../../../provider/ContextProvider";
import LoginButton from "./LoginButton.jsx";
import ProfileButton from "./ProfileButton.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import "../../../assets/css/header.css";
import PeachCoin from "./PeachCoin";
import FilterSearchForm from "./FilterSearchForm";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
const google = window.google;

export default function Header({navbarBrand, setProducts, exclude, include}) {
  const navigate = useNavigate();
  const {cookies, formatErrorRequest, toast} = useHelperContext();

  //useContext hook
  const inputSearch = useRef(null);
  const {authenticatedUser, handleLogin, handleLoginByGoogle} = useUserContext();
  const [loadingLogin, setLoadingLogin] = useState(false);

  //{ useRef hook }
  //register
  const inputRegisterUsername = useRef(null);
  const inputRegisterPassword = useRef(null);
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPhoneNumber = useRef(null);
  const inputAddress = useRef(null);

  //login
  const inputLoginUsername = useRef(null);
  const inputLoginPassword = useRef(null);

  //modals
  const loginModal = useRef(null);

  //{End useRef hook}

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

  // Filter produk berdasarkan input user (search input)
  function handleSearch(e) {
    e.preventDefault();
    let text = inputSearch.current.value;

    if (text === "") {
      axios
        .get(`/api/products`)
        .then(function (response) {
          // handle success
          setProducts(response.data.products);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      axios
        .get(`api/products/search/${text}`)
        .then(function (response) {
          // handle success
          setProducts(response.data.products);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }

  const handleRegisterUser = (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/register", {
        first_name: inputFirstName.current.value,
        last_name: inputLastName.current.value,
        username: inputRegisterUsername.current.value,
        email: inputEmail.current.value,
        password: inputRegisterPassword.current.value,
        phone_number: inputPhoneNumber.current.value,
        address: inputAddress.current.value,
      })
      .then((response) => {
        if (response.data.message === "User has been created") {
          Toast.fire({
            icon: "success",
            title: `Successfully created a user, you can now login to our app!`,
          });
        }
      })
      .catch((exception) => {
        let errors = formatErrorRequest(exception.response.data.errors);

        Toast.fire({
          icon: "error",
          title: "<p>Register failed : </p>" + errors,
        });

        console.log(exception);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);

    const username = inputLoginUsername.current.value;
    const password = inputLoginPassword.current.value;

    let loginStatus = await handleLogin(username, password);
    setLoadingLogin(false);

    if (loginStatus === "success") {
      const closeButton = document.querySelector(".close-button-login-modal");
      return closeButton?.click();
    }
  };

  function handleCredentialResponse(response) {
    const user = jwt_decode(response.credential);

    axios
      .get(`api/users/find-by-email/${user.email}`)
      .then((response) => {
        if (response.data.message === "User was not found") {
          document.querySelector(".close-button-login-modal").click();

          const userInformation = {
            first_name: user.given_name,
            last_name: user.family_name,
            email: user.email,
          };

          cookies.set("user_information", userInformation);

          // redirect to user registration page with google information
          return navigate("/register/google");
        }

        //already registered
        handleLoginByGoogle(user.email);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  useEffect(function () {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("sign-in-button"),
      {theme: "outline", size: "large"} // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-light shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="img-logo-wrapper">
          {navbarBrand === "shopping_cart" ? (
            <img className="logo" src={require("../../../assets/img/navbar_brand_shopping_cart.png")} alt="Shopping cart Navbar Brand" />
          ) : navbarBrand === "product" ? (
            <img className="logo" src={require("../../../assets/img/navbar_brand_product.png")} alt="Product Navbar Brand" />
          ) : navbarBrand === "profile" ? (
            <img className="logo" src={require("../../../assets/img/navbar_brand_profile.png")} alt="Product Navbar Brand" />
          ) : (
            <img className="logo" src={require("../../../assets/img/logo.png")} alt="Peach Commerce Logo" />
          )}
        </Link>

        <button className="navbar-toggler shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex align-items-center ms-auto gap-3 navbar-collapse-container">
            {exclude?.includes("form") ? null : <FilterSearchForm handleSearch={handleSearch} inputSearch={inputSearch} />}

            {exclude?.includes("faq") ? null : <img className="logofaq" src={require("../../../assets/img/faq.png")} alt="Frequently Asked Questions" data-bs-toggle="modal" data-bs-target="#faqModalScrollable" />}

            {include?.includes("peach_coin") ? <PeachCoin /> : null}

            {authenticatedUser === null ? <LoginButton /> : <ProfileButton />}
          </div>
        </div>
      </div>

      <div ref={loginModal} className="modal fade" id="login-modal" tabIndex="-1">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content position-relative">
            <button type="button" className="btn-close position-absolute start-100 top-0 close-button-login-modal" aria-label="Close" data-bs-dismiss="modal"></button>

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                LOGIN
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-container mb-3">
                  <label htmlFor="username">Username / Email:</label>
                  <input ref={inputLoginUsername} type="text" className="input" id="username" name="username" />
                </div>

                <div className="form-container mb-3">
                  <label htmlFor="password">Password:</label>
                  <input ref={inputLoginPassword} type="password" className="input" id="password" name="password" />
                </div>
              </div>

              <div className="modal-footer">
                <div className="buttonfooter">
                  {loadingLogin ? (
                    <Loading description={"Checking data in database"} />
                  ) : (
                    <>
                      <button type="submit" className="login">
                        Login
                      </button>
                      <button type="button" className="register" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#register-modal">
                        Register
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-4">Or login using</div>
                <div className="mb-3">
                  {/* <img alt="Google" className="google" src={require("../../../assets/img/google.png")} /> */}
                  <div id="sign-in-button"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="register-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Register
              </h5>
            </div>

            <form onSubmit={handleRegisterUser}>
              <div className="modal-body">
                <div className="form-container mb-3">
                  <label htmlFor="firstname">First Name</label>
                  <input ref={inputFirstName} type="text" className="input" id="firstname" name="first_name" />
                </div>

                <div className="form-container mb-3">
                  <label htmlFor="lastname">Last Name</label>
                  <input ref={inputLastName} type="text" className="input" id="lastname" name="last_name" />
                </div>

                <div className="form-container mb-3">
                  <label htmlFor="username">Username</label>
                  <input ref={inputRegisterUsername} type="text" className="input" id="username" name="username" />
                </div>

                <div className="form-container mb-3">
                  <label htmlFor="email">Email</label>
                  <input ref={inputEmail} type="text" className="input" id="email" name="email" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input ref={inputRegisterPassword} type="password" className="input" id="password" name="password" />
                </div>

                <div className="form-container mb-3">
                  <label htmlFor="phone-number">Phone Number</label>
                  <input ref={inputPhoneNumber} type="text" className="input" id="phone-number" name="phone_number" />
                </div>

                <div className="form-container mb-3">
                  <label htmlFor="address">Address</label>
                  <input ref={inputAddress} type="text" className="input" id="address" name="address" />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleRegisterUser} type="submit" className="register w-75 m-0" data-bs-dismiss="modal">
                  Register
                </button>
                <div className="mt-4">Or login using</div>
                <div className="mb-3">
                  <img alt="Google" className="google" src={require("../../../assets/img/google.png")} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="faqModalScrollable" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="faqModalScrollableTitle" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header modal-faq-header">
              <h5 className="modal-title" id="faqModalScrollableTitle">
                Peach's Frequently Asked Questions
              </h5>
            </div>
            <div className="modal-body modal-faq">
              <p>Website Aplikasi iseng yang merepresentasikan sebuah e-commerce (situs jual beli online) yang dibuat dengan teknologi Laravel (Backend) dan React (Frontend) yang mengimplementasikan berbagai fitur yang ada di e-commerce pada umumnya.</p>

              <p>Fitur yang terdapat dalam Aplikasi ini : blablabla....</p>
              <div className="modal-footer">
                <button type="button" className="button-close-faq" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
