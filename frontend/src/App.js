import React from "react";
import LandingPage from "./components/LandingPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import FAQ from "./components/FAQ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/FAQ" element={<FAQ/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
