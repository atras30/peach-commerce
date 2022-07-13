import React, {useState, useEffect} from "react";
import axios from "axios";
import Product from "../template/ProductCard";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import "../../assets/css/landingPage.css";
import Loading from "../template/Loading";

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
  }
  
  return (
    <div className="landing-page d-flex flex-column justify-content-between">
      <div>
        <Header setProducts={setProducts} />

        <div className="category-container d-flex justify-content-between px-5 gap-5 overflow-auto">
          <span className="category-item d-flex justify-content-center align-items-center">Pakaian</span>
          <span className="category-item d-flex justify-content-center align-items-center">Makanan</span>
          <span className="category-item d-flex justify-content-center align-items-center">Elektronik</span>
          <span className="category-item d-flex justify-content-center align-items-center">Komputer</span>
          <span className="category-item d-flex justify-content-center align-items-center">Kesehatan</span>
          <span className="category-item d-flex justify-content-center align-items-center">Perawatan</span>
        </div>

        <div className="productContainer">
          {!products ? <Loading description={"Loading Products..."} /> : products.map((eachProduct) => <Product key={eachProduct.id} product={eachProduct} />)}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
