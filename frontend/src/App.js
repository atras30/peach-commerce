import React from "react";
import LandingPage from "./components/LandingPage";
import AddProductPage from "./components/AddProductPage";
import Profile from "./components/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./assets/css/landingPage.css";

function App() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/product/add-product" element={<AddProductPage />}></Route>
          <Route path="/user/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
