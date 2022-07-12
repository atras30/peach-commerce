import React, {useId} from "react";

export default function ShoppingCartCard() {
  const checkboxId = useId();
  
  return (
    <div className="shopping-cart-card mb-4 mx-5 rounded shadow">

      <div className="user-information p-2 px-3 fw-bold d-flex justify-content-between">
        <div className="d-flex gap-2 align-items-center ">
          <input type="checkbox" id={checkboxId}/>
          <label htmlFor={checkboxId}>Atras Shalhan</label>
        </div>

        <div className="delete">
          <button type="button" className="btn btn-danger shadow-sm">Delete Product</button>
        </div>
      </div>

      <div className="product-container p-3 d-flex gap-3 align-items-center">
        <div className="img-wrapper rounded shadow-sm overflow-hidden">
          <img src={require("../../assets/img/product/oppo-reno.jpg")} alt="Product Image" className="img-fluid" />
        </div>

        <div>
          <div className="product-title fw-bold">
            Oppo Reno 4 8/128
          </div>

          <div className="product-category">
            Handphone & Elektronik
          </div>
        </div>

        <div>
          <div className="product-price fw-bold">
            Rp 3.200.000
          </div>
        </div>
      </div>
    </div>
  );
}
