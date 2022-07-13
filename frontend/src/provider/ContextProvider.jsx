import React, {useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const UserContext = React.createContext();
const MiddlewareContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function useMiddlewareContext() {
  return useContext(MiddlewareContext);
}

export default function ContextProvider({children}) {
  //axios
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  //misc
  const cookies = new Cookies();

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
          sessionStorage.setItem("logout_status", true);
          window.location.href = "/";
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
        Toast.fire({
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
        Toast.fire({
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
      .then((response) => setAuthenticatedUser(response.data.user))
      .catch((err) => {
        cookies.remove("Authorization");
        window.location.href = "/";
      });
  };

  const checkCurrentlyLoggedOut = () => {
    if (!sessionStorage.getItem("logout_status")) return;

    Toast.fire({
      icon: "success",
      title: "Successfully logged out!",
    });

    return sessionStorage.removeItem("logout_status");
  };

  function setMiddleware(middlewares) {
    //middlewares variable must be an array
    if (!Array.isArray(middlewares)) return;

    //check each middleware
    middlewares.forEach((middleware) => {
      if (middleware === "auth") {
        getLoggedInUser();
      } else if (true) {
        //next middleware
      }
    });
  }

  useEffect(() => {
    checkAuthenticatedUser();
    checkCurrentlyLoggedOut();
  }, []);

  return (
    <UserContext.Provider value={{authenticatedUser, setAuthenticatedUser, handleLogin, handleLogout}}>
      <MiddlewareContext.Provider value={setMiddleware}>{children}</MiddlewareContext.Provider>
    </UserContext.Provider>
  );
}
