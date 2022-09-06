import React, {useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const UserContext = React.createContext();
const MiddlewareContext = React.createContext();
const HelperContext = React.createContext();
const ShoppingCartContext = React.createContext();
const google = window.google;

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
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  //misc
  const cookies = new Cookies();

  function toastUpdateError(id, responseMessage) {
    toast.update(id, {render: responseMessage, type: "error", isLoading: false, autoClose: 3000, closeOnClick: true});
  }

  function toastUpdateSuccess(id, responseMessage) {
    toast.update(id, {render: responseMessage, type: "success", isLoading: false, autoClose: 3000, closeOnClick: true});
  }

  async function handleLoginByGoogle(email) {
    const id = toast.loading("Loggin you in...");

    const url = `api/auth/login/google`;
    const payload = {
      email: email,
    };

    await axios
      .post(url, payload)
      .then(async (response) => {
        cookies.set("Authorization", `Bearer ${response.data.token}`);

        document.querySelector(".close-button-login-modal").click();
        const userPromise = await axios.get("api/auth/user", {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        });

        toast.update(id, {render: `Hello, ${userPromise.data.user.username}`, type: "success", isLoading: false, autoClose: 3000, closeOnClick: true});
        setAuthenticatedUser(userPromise.data.user);
      })
      .catch((response) => console.log(response));
  }

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
          toast.success("Successfully logged out!");
        }
      });
  };

  //function to handle login logic, return string ("success" | "failed")
  async function handleLogin(username, password) {
    setIsLoginLoading((prevValue) => !prevValue);

    let data = {
      email: username,
      password: password,
    };

    // Send a POST request
    let loginStatus = await axios.post("/api/auth/login", data).then(async (response) => {
      if (response.data.message === "Login failed. Wrong email or password") {
        toast.error(response.data.message);
        return "failed";
      } else {
        cookies.set("Authorization", `Bearer ${response.data.token}`);
        setAuthenticatedUser(response.data.user);
        toast.success(`Login Success, welcome ${response.data.user.full_name}`);
        return "success";
      }
    });

    setIsLoginLoading((prevValue) => !prevValue);
    return loginStatus;
  }

  const getLoggedInUser = async () => {
    setIsLoginLoading((prevValue) => !prevValue);
    //if user not logged in, do nothing
    if (!cookies.get("Authorization")) {
      // prompt google one tap login if the user is not logged in
      google?.accounts?.id?.prompt();
      setIsLoginLoading((prevValue) => !prevValue);
      return false;
    }

    //if user already logged in, fetch user based on its token
    return await axios
      .get("api/auth/user", {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        setAuthenticatedUser(response.data.user);
        return response.data.user;
      })
      .catch((err) => {
        cookies.remove("Authorization");
        navigate("/");
        toast.error("You are not logged in.");
        return false;
      })
      .finally(() => {
        setIsLoginLoading((prevValue) => !prevValue);
      });
  };

  function setMiddleware(middlewares) {
    //middlewares variable must be an array
    if (!Array.isArray(middlewares)) return;

    //check each middleware
    middlewares.forEach(async (middleware) => {
      if (middleware === "auth") {
        if ((await getLoggedInUser()) === false) {
          navigate("/");

          return toast.error(`You are not logged in`);
        }
      } else if (middleware === "verified") {
        if (authenticatedUser?.email_verified_at === null) {
          toast.error(`Your email must be verified`);
          return navigate("/");
        }

        const user = await getLoggedInUser();

        if (user.email_verified_at === null) {
          navigate("/");

          toast.error(`Your email must be verified`);
        }
      } else if (true) {
        //next middleware
      }
    });
  }

  async function handleAddToCart(product) {
    if (!authenticatedUser) {
      document.querySelector(".loginbutton").click();

      return (async () => {
        toast.error(`Please sign in to continue any further`);
      })();
    }

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
      .then(async (response) => {
        await getLoggedInUser();

        if (response.data.message === "created") {
          return setTimeout(() => {
            toast.success(`Product berhasil dimasukkan ke keranjang kamu`);
          }, 0);
        }

        return setTimeout(() => {
          toast.success(`Product berhasil dikeluarkan dari keranjang kamu`);
        }, 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  }

  function formatErrorRequest(errorObject) {
    let errorListings = "";

    Object.keys(errorObject).map(function (key, index) {
      errorListings += errorObject[key].map((each) => `<li>${each}</li>`).join("");
    });

    return `<ul>${errorListings}</ul>`;
  }

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <ShoppingCartContext.Provider value={{handleAddToCart}}>
      <HelperContext.Provider value={{toast, toastUpdateError, toastUpdateSuccess, cookies, formatErrorRequest}}>
        <UserContext.Provider value={{authenticatedUser, setAuthenticatedUser, handleLogin, handleLoginByGoogle, handleLogout, getLoggedInUser, isLoginLoading}}>
          <MiddlewareContext.Provider value={setMiddleware}>{children}</MiddlewareContext.Provider>
        </UserContext.Provider>
      </HelperContext.Provider>
    </ShoppingCartContext.Provider>
  );
}
