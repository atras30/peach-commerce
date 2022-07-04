//import data
import React, {useRef, useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../App";
import LoginButton from "./LoginButton.jsx";
import ProfileButton from "./ProfileButton.jsx";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import "../assets/css/header.css";

export default function Header({handleSearch, setProducts}) {
  //misc
  const cookies = new Cookies();

  //useContext hook
  const inputSearch = useRef(null);
  const {authenticatedUser} = useContext(UserContext);
  const {setAuthenticatedUser} = useContext(UserContext);

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

  //{End useRef hook}

  //{ SWAL (Sweet Alert) Configuration }
  //Toast Configuration
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
  //{ End SWAL (Sweet Alert) Configuration }

  // Filter produk berdasarkan input user (search input)
  function handleSearch() {
    let text = inputSearch.current.value;

    if (text == "") {
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

  //function to handle logout logic
  function handleLogout() {
    axios
      .post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        if (response.data.message == "Successfully Logged Out") {
          cookies.remove("Authorization");
          setAuthenticatedUser(null);
          Toast.fire({
            icon: "success",
            title: `Successfully logged out!`,
          });
          return;
        }
      });
  }

  //function to handle login logic
  async function handleLoginUser(e) {
    e.preventDefault();
    let username = inputLoginUsername.current.value;
    let password = inputLoginPassword.current.value;

    let data = {
      email: username,
      password: password,
    };

    // Send a POST request
    axios.post("/api/auth/login", data).then(async (response) => {
      if (response.data.message == "Login failed. Wrong email or password") {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      } else {
        cookies.set("Authorization", `Bearer ${response.data.token}`);

        let user = await axios
          .get("api/auth/user", {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          })
          .then((response) => response.data.user);

        setAuthenticatedUser(user);
        Toast.fire({
          icon: "success",
          title: `Login Success, welcome ${user.full_name}`,
        });
      }
    });
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
        if (response.data.message == "User has been created") {
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
      });
  };

  return (
    <div className="header">
      <Link to="/" className="img-logo-wrapper">
        <img className="logo" src="./assets/img/logo.png" alt="Peach Commerce Logo" />
      </Link>
      <div className="flexitem">
        <div className="searchbar">
          <input ref={inputSearch} className="search" type="text" placeholder="Search here . . ." />
          <img onClick={handleSearch} className="logosearch" src="./assets/img/search-icon.png" alt="Search Icon" />
        </div>
        <div className="faq">
          <img className="logofaq" src="./assets/img/faq.png" alt="Frequently Asked Questions" data-bs-toggle="modal" data-bs-target="#faqModalScrollable" />
        </div>
        <div>{authenticatedUser == null ? <LoginButton /> : <ProfileButton handleLogout={handleLogout} authenticatedUser={authenticatedUser} />}</div>
      </div>

      <div className="modal fade" id="login-modal" tabIndex="-1">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                LOGIN
              </h5>
            </div>
            <form onSubmit={handleLoginUser}>
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
                  <button onClick={handleLoginUser} type="submit" className="login" data-bs-dismiss="modal">
                    Login
                  </button>
                  <button type="button" className="register" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#register-modal">
                    Register
                  </button>
                </div>
                <div className="mt-4">Or login using</div>
                <div className="mb-3">
                  <img className="google" src="./assets/img/google.png" />
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
                  <img className="google" src="./assets/img/google.png" />
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
    </div>
  );
}
