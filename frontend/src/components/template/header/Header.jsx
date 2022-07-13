//import data
import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useUserContext} from "../../../provider/ContextProvider";
import LoginButton from "./LoginButton.jsx";
import ProfileButton from "./ProfileButton.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import "../../../assets/css/header.css";

export default function Header({setProducts}) {
  //useContext hook
  const inputSearch = useRef(null);
  const {authenticatedUser, handleLogin} = useUserContext();
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
        let errors = exception.response.data.errors;
        let errorList = [];

        for (let field in errors) {
          if (errors.hasOwnProperty(field)) {
            errorList.push(errors[field].join(" & "));
          }
        }

        errorList = errorList.join("<br/>");

        Toast.fire({
          icon: "error",
          title: "Oops, Register failed...<br/>" + errorList,
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

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div class="container-fluid">
        <Link to="/" className="img-logo-wrapper navbar-brand">
          <img className="logo" src={require("../../../assets/img/logo.png")} alt="Peach Commerce Logo" />
        </Link>

        <button class="navbar-toggler shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="d-flex align-items-center ms-auto gap-3 navbar-collapse-container">
            <form className="searchbar" onSubmit={handleSearch}>
              <input ref={inputSearch} onInput={handleSearch} className="search" type="text" placeholder="Filter Product . . ." />
              <img className="logosearch" src={require("../../../assets/img/search-icon.png")} alt="Search Icon" />
              <button type="submit" className="d-none"></button>
            </form>

            <img className="logofaq" src={require("../../../assets/img/faq.png")} alt="Frequently Asked Questions" data-bs-toggle="modal" data-bs-target="#faqModalScrollable" />

              {authenticatedUser === null ? <LoginButton /> : <ProfileButton />}
          </div>
        </div>
      </div>

      <div ref={loginModal} className="modal fade" id="login-modal" tabIndex="-1">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content position-relative">
            <button type="button" class="btn-close position-absolute start-100 top-0 close-button-login-modal" aria-label="Close" data-bs-dismiss="modal"></button>

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
                  <img alt="Google" className="google" src={require("../../../assets/img/google.png")} />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum ratione neque, consectetur ducimus iste similique illum ea, in quisquam a quo enim ut provident dicta commodi eaque alias. Placeat quaerat laborum quis quos labore error deleniti nulla natus dolorem, animi eos esse
              accusantium possimus minima impedit minus. Eveniet numquam, ipsam dolor quod explicabo beatae? Dolore, ipsum natus voluptatum magni vero excepturi repudiandae. Odio nisi error dolorem deleniti quaerat nesciunt esse tenetur minus tempore qui placeat, ad expedita aliquid explicabo
              laborum ab molestiae quisquam, ullam voluptas. Iusto officiis facilis perferendis maxime debitis odit quo aliquam, sit beatae! Tempore at illo numquam, modi incidunt mollitia? Aspernatur explicabo tempora ad quam! Fugiat adipisci porro optio rerum ipsam illum ducimus vitae, cupiditate,
              consequatur provident architecto id consequuntur nulla, quisquam sint. Ducimus autem quos exercitationem iusto fugiat id quam consectetur, perferendis dolore aspernatur quis unde quas repellendus delectus deleniti eligendi molestias eveniet quo quisquam eos praesentium, similique minus
              sed! Similique fuga dignissimos, qui deserunt, molestiae quo eos veniam unde repellat corporis tenetur porro corrupti ratione temporibus non alias. Quod possimus dicta illo, ullam deleniti fuga unde vero at non labore veniam, tenetur cupiditate explicabo et architecto similique facere
              earum voluptas alias adipisci nam. Nisi corporis alias velit facilis esse saepe earum deserunt minima delectus! Voluptate deleniti ipsum voluptates earum eum dignissimos atque fugiat ipsam? Quis tempora distinctio libero deserunt quae itaque vel accusantium voluptatum ad voluptate,
              asperiores nemo similique unde sapiente doloribus quasi, voluptatibus non fugit ipsa. Error hic doloribus perferendis nostrum architecto? Molestiae ducimus, ipsa, doloremque quia aliquid aut deleniti culpa expedita enim incidunt commodi. Nisi tempora nam quam a dolorum tenetur facilis
              quisquam magni itaque atque corrupti consequuntur molestias est, mollitia sit soluta labore porro laudantium eos nemo doloremque sunt? Ad repudiandae velit obcaecati molestiae veritatis consequuntur? Accusantium dolor eius reiciendis pariatur unde voluptate laborum nulla sed, hic quas
              explicabo accusamus rerum perferendis nihil illo error repellat ut. Nesciunt laboriosam, vitae qui possimus magni hic. Officiis similique iste voluptatibus recusandae nostrum impedit tenetur, nisi nemo doloremque veritatis, accusamus expedita optio voluptatem ea dolor commodi assumenda
              magnam eius error a architecto. Dolor molestias vel iste, explicabo, praesentium eveniet ipsa corrupti temporibus iusto voluptatum rerum vitae ratione excepturi sapiente dolore aperiam dolorum at aliquid. Est fuga eius modi minus exercitationem minima eveniet quae reprehenderit sit.
              Impedit necessitatibus laborum perferendis! Vero sint doloremque, nesciunt ex nobis aliquam aut, quidem illum cumque aperiam necessitatibus unde et doloribus inventore fugit atque quod excepturi ab debitis! Consectetur quasi necessitatibus repudiandae molestiae consequuntur maxime
              velit animi quo, debitis iusto autem dolorem quaerat quibusdam non quidem dolore laboriosam iure optio aliquid corrupti laudantium. Non dicta earum veniam, quidem id inventore amet consectetur ut explicabo iste natus esse provident eaque perspiciatis magnam nam modi? Distinctio,
              reprehenderit voluptatum veniam, a sunt unde, molestias pariatur ratione cum deserunt ullam doloribus odio qui numquam illo! Eum quidem pariatur quod nulla quis repellat voluptatum repellendus exercitationem expedita cum beatae laboriosam eaque facere voluptas delectus deleniti,
              obcaecati id officia similique porro voluptates eius! Repudiandae, repellendus deleniti?
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
