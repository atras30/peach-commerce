import React, {useState} from "react";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import "../../assets/css/add_user_product.css";
import axios from "axios";
import {useRef} from "react";
import {useHelperContext, useMiddlewareContext} from "../../provider/ContextProvider";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function AddUserProduct() {
  const setMiddleware = useMiddlewareContext();
  const {toast, formatErrorRequest, cookies} = useHelperContext();
  const inputTitle = useRef(null);
  const inputDescription = useRef(null);
  const inputStock = useRef(null);
  const inputPrice = useRef(null);
  const inputDiscount = useRef(null);
  const inputLocation = useRef(null);
  const inputProductImage = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const url = "api/products";

    const payload = {
      title: inputTitle.current.value,
      description: inputDescription.current.value,
      stock: inputStock.current.value,
      price: inputPrice.current.value,
      discount: inputDiscount.current.value,
      location: inputLocation.current.value,
      product_image: inputProductImage.current.files[0],
    };

    const config = {
      headers: {
        Authorization: cookies.get("Authorization"),
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(url, payload, config)
      .then((response) => {
        toast.success("Product was successfully added to your listings.");
        navigate(`/product?id=${response.data.product.id}`);
      })
      .catch((response) => {
        let errorObject = response.response.data.errors;
        const errorListings = formatErrorRequest(errorObject);

        toast.error(`<p">Add Product Failed :</p>${errorListings}`);
      });
  }

  useEffect(function () {
    setMiddleware(["auth", "verified"]);
  }, []);

  return (
    <div className="add-product-page d-flex justify-content-between flex-column">
      <div>
        <Header></Header>

        <div className="add-product-container row m-0 d-flex justify-content-center align-items-center p-4">
          <div className="add-product-wrapper col-12 col-sm-8 col-md-6 rounded shadow p-4">
            <div className="title fs-2 fw-bold text-center mb-3">Add Product</div>

            <form action="" encType="multipart/form-data" className="fw-bold">
              <div className="mb-3">
                <label htmlFor="input-title" className="form-label">
                  Title
                </label>
                <input ref={inputTitle} required type="text" className="form-input" id="input-title"></input>
              </div>

              <div className="mb-3">
                <label htmlFor="input-description" className="form-label">
                  Description
                </label>
                <textarea ref={inputDescription} style={{minHeight: "100px"}} required type="text" className="form-input" id="input-description"></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="input-stock" className="form-label">
                  Stock
                </label>
                <input ref={inputStock} required type="number" className="form-input" id="input-stock"></input>
              </div>

              <div className="mb-3">
                <label htmlFor="input-price" className="form-label">
                  Price
                </label>
                <input ref={inputPrice} required type="number" className="form-input" id="input-price"></input>
              </div>

              <div className="mb-3">
                <label htmlFor="input-discount" className="form-label">
                  Discount
                </label>
                <input ref={inputDiscount} required min="0" max="100" type="number" className="form-input" id="input-discount"></input>
              </div>

              <div className="mb-3">
                <label htmlFor="input-location" className="form-label">
                  Location
                </label>
                <input ref={inputLocation} required type="text" className="form-input" id="input-location"></input>
              </div>

              <div className="mb-3">
                <label htmlFor="input-product-image" className="form-label">
                  Product Image
                </label>
                <input ref={inputProductImage} className="form-control" type="file" id="input-product-image" />
              </div>

              <button onClick={handleSubmit} className="btn fw-bold shadow-sm border border-secondary button-buy d-flex justify-content-center align-items-center gap-2">
                <i className="bi bi-plus-circle-fill"></i> <span>Submit</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
