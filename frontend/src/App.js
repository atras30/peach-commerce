import React from "react";
import LandingPage from "./components/LandingPage";
import AddProductPage from "./components/AddProductPage";
import Profile from "./components/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/product/add-product" element={<AddProductPage/>}></Route>
        <Route path="/user/profile" element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
