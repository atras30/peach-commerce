import React from "react";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import "../../assets/css/user_product_page.css";
import Loading from "../template/Loading";
import UserProduct from "./UserProduct";
import {useUserContext, useMiddlewareContext} from "../../provider/ContextProvider";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function UserProductPage() {
  const navigate = useNavigate();
  const {authenticatedUser} = useUserContext();
  const setMiddleware = useMiddlewareContext();

  useEffect(() => {
    setMiddleware(["auth", "verified"]);
  }, []);

  const handleAddNewProductRedirect = () => {
    navigate("/product/add-product");
  };

  return (
    <div className="user-product-page d-flex justify-content-between flex-column">
      <div>
        <Header></Header>

        <div className="position-relative mb-3">
          <div className="title-button-container">
            <div className="position-relative title-button-wrapper">
              <h1 className="title text-center fw-bold my-3">Your Products</h1>
              <button onClick={handleAddNewProductRedirect} className="btn fw-bold shadow-sm border border-secondary add-product-button d-flex justify-content-center align-items-center gap-2">
                <i className="bi bi-plus-circle-fill"></i> <span>Add New Product</span>
              </button>
            </div>
          </div>
        </div>

        <div className="products-container px-2 mb-3 d-flex justify-content-center align-items-stretch gap-3 flex-wrap">
          {!authenticatedUser ? <Loading description={"Loading Products..."} /> : authenticatedUser?.products.map((eachProduct) => <UserProduct key={eachProduct.id} product={eachProduct} />)}
        </div>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
