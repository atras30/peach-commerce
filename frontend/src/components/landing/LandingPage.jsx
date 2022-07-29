import React, {useState, useEffect} from "react";
import axios from "axios";
import Product from "../template/ProductCard";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import "../../assets/css/landingPage.css";
import Category from "./Category";
import Loading from "../template/Loading";
import {useHelperContext} from "../../provider/ContextProvider";

export default function LandingPage() {
  //useState hook
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const {toast} = useHelperContext();

  //on init
  useEffect(function () {
    getProducts();
    getCategories();
  }, []);

  function getCategories() {
    axios
      .get("/api/categories")
      .then(function (response) {
        // handle success
        setCategories(response.data.categories);
      })
      .catch(function (error) {
        // handle error
        toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  }

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
        toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  };

  return (
    <div className="landing-page d-flex flex-column justify-content-between">
      <div>
        <Header setProducts={setProducts} />

        <div className="category-container d-flex justify-content-between px-5 gap-5 overflow-auto">
          {categories?.map((category) => (
            <Category category={category} key={category.id}/>
          ))}
        </div>

        <div className="productContainer">{!products ? <Loading description={"Loading Products..."} /> : products.map((eachProduct) => <Product key={eachProduct.id} product={eachProduct} />)}</div>
      </div>

      <Footer />
    </div>
  );
}
