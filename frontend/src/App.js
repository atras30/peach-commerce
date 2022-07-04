import React, {useState, useEffect} from "react";
import LandingPage from "./components/LandingPage";
import AddProductPage from "./components/AddProductPage";
import Profile from "./components/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Helmet} from "react-helmet";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

export const UserContext = React.createContext();

function App() {
  //axios
  axios.defaults.baseURL = "http://localhost:8000/";

  //misc
  const cookies = new Cookies();

  //user context state
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  //check if the user already logged in or not
  // if so, then update the authenticated user state
  // if not, then do nothing
  const checkAuthenticatedUser = async () => {
    //if user not logged in, do nothing
    if (!cookies.get("Authorization")) return;

    //if user already logged in, fetch user based on its token
    await axios
      .get("api/auth/user", {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => setAuthenticatedUser(response.data.user));
  };

  //on init
  useEffect(() => {
    checkAuthenticatedUser();
  }, []);

  return (
    <UserContext.Provider value={{authenticatedUser, setAuthenticatedUser}}>
      <Helmet>
        {/* Bootstrap 5 CSS & JS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        {/* End Bootstrap 5 CSS & JS */}
      </Helmet>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/product/add-product" element={<AddProductPage />}></Route>
          <Route path="/user/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
