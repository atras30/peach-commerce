import React from "react";
import LandingPage from "./components/LandingPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
