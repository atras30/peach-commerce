import React from "react";
import LandingPage from "./components/landing/LandingPage";
import AddProductPage from "./components/product/AddProductPage";
import ProductPage from "./components/product/ProductPage";
import Profile from "./components/profile/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Helmet} from "react-helmet";
import ContextProvider from "./provider/ContextProvider";
import ShoppingCartPage from "./components/shopping_cart/ShopingCartPage";
import EmailResendPage from "./components/email/EmailResendPage";
import EmailVerificationPage from "./components/email/EmailVerificationPage";

function App() {
  return (
    <>
      <Helmet>
        {/* Bootstrap 5 CSS & JS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"></link>
        <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        {/* End Bootstrap 5 CSS & JS */}

        {/* Style Dasar CSS */}
        <link rel="stylesheet" href="./assets/css/style.css" />
      </Helmet>

      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/product" element={<ProductPage />}></Route>
            <Route path="/product/add-product" element={<AddProductPage />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/user/shopping-cart" element={<ShoppingCartPage />}></Route>


            {/* ROUTE EMAIL HANDLER */}
            <Route path="/mail/verification" element={<EmailVerificationPage />}></Route>
            <Route path="/mail/verification/resend" element={<EmailResendPage />}></Route>
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
