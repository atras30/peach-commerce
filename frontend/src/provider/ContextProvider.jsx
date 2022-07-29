import React, {useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const UserContext = React.createContext();
const MiddlewareContext = React.createContext();
const HelperContext = React.createContext();
const ShoppingCartContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

export function useHelperContext() {
  return useContext(HelperContext);
}

export function useMiddlewareContext() {
  return useContext(MiddlewareContext);
}

export default function ContextProvider({children}) {
  const navigate = useNavigate();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  //toast SWAL Configuration
  const toast = Swal.mixin({
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

  //misc
  const cookies = new Cookies();

  //function to handle logout logic
  const handleLogout = () => {
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
        if (response.data.message === "Successfully Logged Out") {
          cookies.remove("Authorization");
          setAuthenticatedUser(null);
          navigate("/");
          toast.fire({
            icon: "success",
            title: "Successfully logged out!",
          });
        }
      });
  };

  //function to handle login logic, return string ("success" | "false")
  async function handleLogin(username, password) {
    let data = {
      email: username,
      password: password,
    };

    // Send a POST request
    let loginStatus = await axios.post("/api/auth/login", data).then(async (response) => {
      if (response.data.message === "Login failed. Wrong email or password") {
        toast.fire({
          icon: "error",
          title: response.data.message,
        });
        return "failed";
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
        toast.fire({
          icon: "success",
          title: `Login Success, welcome ${user.full_name}`,
        });
        return "success";
      }
    });

    return loginStatus;
  }

  //check if the user already logged in or not
  const checkAuthenticatedUser = async () => {
    //if user not logged in, do nothing
    if (!cookies.get("Authorization")) return;

    //if user already logged in, fetch user based on its token
    getLoggedInUser();
  };

  const getLoggedInUser = async () => {
    axios
      .get("api/auth/user", {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        setAuthenticatedUser(response.data.user);
      })
      .catch((err) => {
        cookies.remove("Authorization");
        navigate("/");
        toast.fire({
          icon: "error",
          title: "You are not logged in.",
        });
      });
  };

  function setMiddleware(middlewares) {
    //middlewares variable must be an array
    if (!Array.isArray(middlewares)) return;

    //check each middleware
    middlewares.forEach(async (middleware) => {
      if (middleware === "auth") {
        getLoggedInUser();
      } else if (middleware === "verified") {
        await getLoggedInUser();

        if (authenticatedUser.email_verified_at === null) {
          navigate("/");
        }
      } else if (true) {
      }
    });
  }

  async function handleAddToCart(product) {
    return axios
      .post(
        "/api/shopping-cart",
        {
          user_id: authenticatedUser.id,
          product_id: product.id,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        checkAuthenticatedUser();

        if (response.data.message === "created")
          return toast.fire({
            icon: "success",
            title: `Product berhasil dimasukkan ke keranjang kamu`,
          });

        return toast.fire({
          icon: "success",
          title: `Product berhasil dikeluarkan dari keranjang kamu`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.fire({
          icon: "error",
          title: `${error}`,
        });
      });
  }

  function formatErrorRequest(errorObject) {
    let errorListings = "";
    
    Object.keys(errorObject).map(function (key, index) {
      errorListings += errorObject[key].map((each) => `<li>${each}</li>`);
    });
    
    return `<ol>${errorListings}</ol>`;
  }

  useEffect(() => {
    checkAuthenticatedUser();
  }, []);

  return (
    <ShoppingCartContext.Provider value={{handleAddToCart}}>
      <HelperContext.Provider value={{toast, cookies, formatErrorRequest}}>
        <UserContext.Provider value={{authenticatedUser, setAuthenticatedUser, handleLogin, handleLogout, checkAuthenticatedUser}}>
          <MiddlewareContext.Provider value={setMiddleware}>{children}</MiddlewareContext.Provider>
        </UserContext.Provider>
      </HelperContext.Provider>
    </ShoppingCartContext.Provider>
  );
}
