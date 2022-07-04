import React, {useState} from "react";
import LandingPage from "./components/LandingPage";
import AddProductPage from "./components/AddProductPage";
import Profile from "./components/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Helmet} from "react-helmet";
import "./assets/css/landingPage.css";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  return (
    <>
      <Helmet>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </Helmet>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />}></Route>
          <Route path="/product/add-product" element={<AddProductPage />}></Route>
          <Route path="/user/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
