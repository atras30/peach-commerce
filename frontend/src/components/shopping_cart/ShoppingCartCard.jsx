import axios from "axios";
import React, {useId} from "react";
import {useEffect} from "react";
import {useUserContext, useHelperContext} from "../../provider/ContextProvider";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

export default function ShoppingCartCard({shoppingCart}) {
  const navigate = useNavigate();
  const checkboxId = useId();
  const {authenticatedUser, getLoggedInUser} = useUserContext();
  const {toast} = useHelperContext();

  useEffect(function () {
    // console.log(shoppingCart);
  }, []);

  function handleProductRedirect() {
    navigate(`/product?id=${shoppingCart.product.id}`);
  }

  async function handleDeleteShoppingCart() {
    return axios
      .post(
        "/api/shopping-cart",
        {
          user_id: authenticatedUser.id,
          product_id: shoppingCart.product_id,
        },
        {
          headers: {
            Authorization: new Cookies().get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        getLoggedInUser();

        if (response.data.message === "created")
          return toast.fire({
            icon: "success",
            title: `Product has been added to your shopping cart`,
          });

        return toast.fire({
          icon: "success",
          title: `Product has been removed from your shopping cart`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.fire({
          icon: "error",
          title: `${error}`,
        });
      });
  }

  return (
    <div className="shopping-cart-card mb-4 rounded shadow">
      <div className="user-information p-2 px-3 fw-bold d-flex justify-content-between">
        <div className="user-information-checkbox-container d-flex align-items-center ">
          <input type="checkbox" id={checkboxId} />
          <label className="p-1 px-2" htmlFor={checkboxId}>
            {shoppingCart.product.owner.username}
          </label>
        </div>

        <div className="delete">
          <button onClick={handleDeleteShoppingCart} type="button" className="btn btn-danger shadow-sm">
            Remove Product
          </button>
        </div>
      </div>

      <div className="product-container p-3 d-flex gap-3 align-items-center" onClick={handleProductRedirect}>
        <div className="img-wrapper rounded shadow-sm overflow-hidden">
          <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${shoppingCart?.product?.img_link}`} alt="Product Image" className="img-fluid img-thumbnail" />
        </div>

        <div>
          <div className="product-title fw-bold">{shoppingCart?.product?.title}</div>

          <div className="product-category">Handphone & Elektronik</div>
        </div>

        <div>
          <div className="product-price fw-bold">{shoppingCart?.product?.price}</div>
        </div>
      </div>
    </div>
  );
}
