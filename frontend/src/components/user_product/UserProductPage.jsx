import React from "react";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import "../../assets/css/user_product_page.css";
import Loading from "../template/Loading";
import UserProduct from "./UserProduct";
import { useUserContext, useMiddlewareContext } from "../../provider/ContextProvider";
import { useEffect } from "react";

export default function UserProductPage() {
  const {authenticatedUser} = useUserContext();
  const setMiddleware = useMiddlewareContext();

  useEffect(() => {
    setMiddleware(["auth", "verified"]);
  },[])

  return (
    <div className="user-product-page d-flex justify-content-between flex-column">
      <div>
        <Header></Header>

        <h1 className="title text-center fw-bold my-3">Your Products</h1>

        <div className="products-container px-2 mb-3 d-flex justify-content-center align-items-stretch gap-3 flex-wrap">
          {!authenticatedUser ? <Loading description={"Loading Products..."} />
          : 
          authenticatedUser?.products.map((eachProduct) => <UserProduct key={eachProduct.id} product={eachProduct} />)}
        </div>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
