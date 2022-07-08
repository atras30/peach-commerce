import axios from "axios";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import UniversalHeader from "../template/header/UniversalHeader";
import "../../assets/css/product_page.css";
import Product from "./Product";

export default function ProductPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const [productId, setProductId] = useState(queryParams.get("id"));
  const [product, setProduct] = useState(null);
  const [redirectToHomepage, setRedirectToHomepage] = useState(false);

  const handleRedirectToHomepage = () => {
    setRedirectToHomepage((prevValue) => !prevValue);
  };

  const fetchProduct = async () => {
    return axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        response.data.product.total_reviews = response.data.product.reviews.length;

        if(response.data.product.reviews.length == 0) {
          response.data.product.rating = 0;
          console.log('true');
          return setProduct(response.data.product)
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
    if(Math.round(number) == 0) return '★';
    
    let stars = "";

    for(let i = 0; i < Math.round(number); i++) stars += '★';

    return stars;
  }

  useEffect(function () {
    if (!productId) handleRedirectToHomepage();

    fetchProduct();
  }, []);

  return (
    <div className="product-page">
      {redirectToHomepage && <Navigate to="/" />}
      <UniversalHeader />

      <div className="p-3 px-4">
        <div>{!product ? "Fecthing Data..." : <Product product={product} />}</div>

        <div className="review-container">
          <div className="review-title">Semua Ulasan ({product?.total_reviews})</div>
          
          <div className="review bordered d-flex gap-3">
            <i className="bi bi-person-circle"></i>

            <div className="user-information">
              <div className="user-username">
                {product?.reviews[0]?.user?.username}
              </div>
              <div className="user-timestamp text-muted">
                1 minggu yang lalu
              </div>
            </div>

            <div className="user-comment">
              <div className="star-rating">
                {product?.reviews[0]?.rating} {printStars(product?.reviews[0]?.rating)}
              </div>
              <div className="star-rating">
                {product?.reviews[0]?.review}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
