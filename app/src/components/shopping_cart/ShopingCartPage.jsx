import React, {useEffect} from "react";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import ShoppingCartCard from "./ShoppingCartCard";
import "../../assets/css/shopping_cart.css";
import {useUserContext} from "../../provider/ContextProvider";
import Loading from "../template/Loading";
import { useState } from "react";

export default function ShopingCartPage() {
  const {authenticatedUser} = useUserContext();
  const [shoppingCarts, setShoppingCarts] = useState(null);

  useEffect(function() {
    setShoppingCarts(authenticatedUser?.shopping_carts);
  }, [authenticatedUser]);

  return (
    <div className="shopping-cart-container d-flex justify-content-between flex-column">
      <div>
        <Header navbarBrand="shopping_cart" exclude={["form"]} />

        <div className="my-4 p-5 pt-0 gap-4 shopping-cart-products-container d-flex align-items-center justify-content-center">
          <div className="product-wrapper">
            {!shoppingCarts ? (
              <Loading description={"Fetching Shoppping Cart Data..."} />
            ) : shoppingCarts.length === 0 ? (
              <div className="container fw-bold fs-4 d-flex justify-content-center align-items-center">Empty Shopping Cart</div>
            ) : (
              shoppingCarts?.map((shoppingCart) => <ShoppingCartCard key={shoppingCart.id} setShoppingCarts={setShoppingCarts} shoppingCart={shoppingCart}></ShoppingCartCard>)
            )}
          </div>

          <div className="summary-wrapper p-3 rounded shadow align-self-start fw-bold">
            <div className="border-bottom border-dark pb-2 text-center mb-2">Order Summary</div>

            <div className="order-summary-product-wrapper mb-2 p-2 rounded shadow-sm">
              <div className="mb-2 border-bottom border-secondary">LED Bulb 7W ECO, Putih - MEVAL</div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>Qty : 2</div>
                <div>Rp. 27.000.000</div>
              </div>

              <div className="">Ekspedisi : JNE</div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>Total Harga :</div>
              <div>Rp 40.000.000</div>
            </div>

            <div>
              <button className="btn w-100 fw-bold shadow-sm border border-secondary button-buy">Beli Sekarang</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
