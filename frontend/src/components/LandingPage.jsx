import React, {useState, useEffect} from "react";
import axios from "axios";
import Product from "./Product.jsx";
import Header from "./template/header/Header";
import Footer from "./template/footer/Footer";
import "../assets/css/landingPage.css";
import Loading from "./Loading";

export default function LandingPage() {
  //useState hook
  const [products, setProducts] = useState(null);

  //on init
  useEffect(function () {
    getProducts();
  }, []);

  //function to get all product in the server
  const getProducts = () => {
    axios
      .get("/api/products")
      .then(function (response) {
        // handle success
        setProducts(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="landing-page">
      <Header setProducts={setProducts} />

      <div className="category-container d-flex justify-content-evenly align-items-stretch">
        <div className="category-item d-flex justify-content-center align-items-center px-2">Pakaian</div>
        <div className="category-item d-flex justify-content-center align-items-center px-2">Makanan</div>
        <div className="category-item d-flex justify-content-center align-items-center px-2">Elektronik</div>
        <div className="category-item d-flex justify-content-center align-items-center px-2">Komputer & Aksesoris</div>
        <div className="category-item d-flex justify-content-center align-items-center px-2">Kesehatan</div>
        <div className="category-item d-flex justify-content-center align-items-center px-2">Perawatan</div>
      </div>

      <div className="productContainer">
        {!products ? (
          <Loading description={"Loading Products..."} />
        ) : (
          products.map(function (eachProduct) {
            return <Product key={eachProduct.id} product={eachProduct} />;
          })
        )}
      </div>

      <Footer />
    </div>
  );
}
