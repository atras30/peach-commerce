import axios from "axios";
import React, {useId} from "react";
import {useEffect} from "react";
import {useUserContext, useHelperContext} from "../../provider/ContextProvider";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loading from "../template/Loading";

export default function ShoppingCartCard({shoppingCart, setShoppingCarts}) {
  const navigate = useNavigate();
  const checkboxId = useId();
  const {authenticatedUser, getLoggedInUser} = useUserContext();
  const {toast, cookies} = useHelperContext();
  const [isShoppingCartProcessing, setIsShoppingCartProcessing] = useState(false);

  useEffect(function () {
    console.log(shoppingCart);
  }, []);

  function handleProductRedirect() {
    navigate(`/product?id=${shoppingCart.product.id}`);
  }

  function toggleProcessingShoppingCart() {
    setIsShoppingCartProcessing((prevValue) => !prevValue);
  }

  async function handleDeleteShoppingCart() {
    if (isShoppingCartProcessing) {
      return;
    }

    toggleProcessingShoppingCart();

    await axios
      .post(
        "/api/shopping-cart",
        {
          user_id: authenticatedUser.id,
          product_id: shoppingCart.product_id,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then(async (response) => {
        await getLoggedInUser();

        return (async () => {
          toast.fire({
            icon: "success",
            title: `Product has been removed from your shopping cart`,
          });
        })();
      })
      .catch((error) => {
        (async () => {
          toast.fire({
            icon: "error",
            title: `${error}`,
          });
        })();
      });

    return toggleProcessingShoppingCart();
  }

  function stopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  async function handleToggleActive(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `/api/shopping-cart/active/${shoppingCart?.id}`;
    const data = {};
    const config = {
      headers: {
        Authorization: cookies.get("Authorization")
      }
    };
    
    return axios.post(url, data, config)
    .then(async (response) => {
      const user = await getLoggedInUser();
      console.log(response)
      setShoppingCarts(user.shopping_carts);
    })
    .catch(response => console.log(response));
  }

  return (
    <div className="shopping-cart-card mb-4 rounded shadow">
      <div className="user-information p-2 px-3 fw-bold d-flex justify-content-between">
        <div className="user-information-1-container d-flex align-items-center noselect" onClick={handleToggleActive}>
          <input type="checkbox" id={checkboxId} defaultChecked={shoppingCart.is_active}/>
          <label className="p-1 px-2" htmlFor={checkboxId}>
            {shoppingCart.product.owner.username}
          </label>
        </div>

        <div className="delete">
          {isShoppingCartProcessing ? (
            <Loading description={"Processing..."} />
          ) : (
            <button onClick={handleDeleteShoppingCart} type="button" className="btn btn-danger shadow-sm">
              Remove Product
            </button>
          )}
        </div>
      </div>

      <div className="product-container p-3 row" onClick={handleProductRedirect}>
        <div className="col-4">
          <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${shoppingCart?.product?.img_link}`} alt="Product Image" className="img-fluid img-thumbnail" />
        </div>

        <div className="col-3 d-flex justify-content-center flex-column gap-3">
          <div className="product-title fw-bold">{shoppingCart?.product?.title}</div>

          <div className="product-category">Handphone & Elektronik</div>
        </div>

        <div className="col-2 d-flex justify-content-center flex-column" onClick={stopPropagation}>
          <div className="product-quantity-label fw-bold">Quantity : </div>
          <input type="number" min={0} max={99} className="form-control" id="exampleFormControlInput1" />
        </div>

        <div className="col-2 d-flex justify-content-center flex-column">
          <div className="product-price-label fw-bold">Price : </div>
          <div className="product-price fw-bold">{shoppingCart?.product?.price}</div>
        </div>
      </div>
    </div>
  );
}
