import axios from "axios";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import "../../assets/css/product_page.css";
import Product from "./Product";
import Review from "./Review";

export default function ProductPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const [productId, setProductId] = useState(queryParams.get("id"));
  const [product, setProduct] = useState(null);
  const [redirectToHomepage, setRedirectToHomepage] = useState(false);
  const navbarExclude = {
    form: true
  }

  const handleRedirectToHomepage = () => {
    setRedirectToHomepage((prevValue) => !prevValue);
  };

  const fetchProduct = async () => {
    return axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        response.data.product.total_reviews = response.data.product.reviews.length;

        if (response.data.product.reviews.length == 0) {
          response.data.product.rating = 0;
          return setProduct(response.data.product);
        }

        let totalReview = 0;
        let totalRating = 0;

        // console.log(response.data.product.reviews);
        response.data.product.reviews.forEach((review) => {
          totalReview++;
          totalRating += review.rating;
        });

        response.data.product.rating = (totalRating / totalReview).toFixed(1);
        setProduct(response.data.product);
      })
      .catch((error) => {
        alert("Oops... someting went wrong : <br>" + error.message);
      });
  };

  function printStars(number) {
    if (Math.round(number) == 0) return "★";

    let stars = "";

    for (let i = 0; i < Math.round(number); i++) stars += "★";

    return stars;
  }

  useEffect(function () {
    if (!productId) handleRedirectToHomepage();

    fetchProduct();
  }, []);

  return (
    <div className="product-page">
      {redirectToHomepage && <Navigate to="/" />}
      <Header exclude={navbarExclude}/>

      <div className="p-3 px-4">
        <div>{!product ? "Fecthing Data..." : <Product product={product} />}</div>

        <div className="review-container">
          <div className="review-title text-uppercase mb-2">
            {product ? <> Semua Ulasan <span className="fw-bold">({product?.total_reviews})</span></> : null }
          </div>

          {product?.reviews?.map((review) => (
            <Review review={review} printStars={printStars} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
