//react components & hooks
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useToastContext} from "../../provider/ContextProvider";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import Product from "./Product";
import Review from "./Review";
import Loading from "../template/Loading";
import { useMiddlewareContext } from "../../provider/ContextProvider";

//libraries
import axios from "axios";

//css
import "../../assets/css/product_page.css";

export default function ProductPage() {
  const setMiddleware = useMiddlewareContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const toast = useToastContext();
  const navbarExclude = {
    form: true,
  };

  const handleRedirectToHomepage = () => {
    navigate("/");
  };

  const fetchProduct = async () => {
    return axios
      .get(`/api/products/${searchParams.get("id")}`)
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
        let message = error.response.data.message;
        if (error.response.data.message.includes("No query results for model")) {
          message = `Product with id ${searchParams.get("id")} was not found.`;
        }

        toast.fire({
          icon: "error",
          title: message,
        });
        navigate("/");
      });
  };

  function printStars(number) {
    if (Math.round(number) == 0) return "★";
    let stars = "";
    for (let i = 0; i < Math.round(number); i++) stars += "★";
    return stars;
  }

  useEffect(function () {
    if (!searchParams.get("id")) handleRedirectToHomepage();

    fetchProduct();
  }, []);

  return (
    <div className="product-page d-flex justify-content-between flex-column">
      <div>
        <Header exclude={navbarExclude} />

        <div className="p-3 px-4">
          <div>{!product ? <Loading description={"Fetching Data..."}/> : <Product product={product} />}</div>

          <div className="review-container">
            <div className="review-title text-uppercase mb-2">
              {product ? (
                <>
                  Semua Ulasan <span className="fw-bold">({product?.total_reviews})</span>
                </>
              ) : null}
            </div>

            {product?.reviews?.map((review) => (
              <Review fetchProduct={fetchProduct} review={review} key={review.id} printStars={printStars} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
}
