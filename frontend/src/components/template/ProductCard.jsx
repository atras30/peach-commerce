import React from "react";
import { useState } from "react";
import "../../assets/css/product.css";
import {Navigate} from "react-router-dom";

export default function Product({product}) {
  const [redirectToProductPage, setRedirectToProductPage] = useState(false);
  
  const handleAddToCart = () => {
    window.location.href="/product/add-product";
  };

  const formatRupiah = (bilangan) => {
    let separator = null;
    let number_string = bilangan.toString();
    let sisa = number_string.length % 3;
    let rupiah = number_string.substr(0, sisa);
    let ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return `Rp ${rupiah}`;
  };

  const toggleRedirectProductPage = () => {
    setRedirectToProductPage(prevValue => !prevValue);
  }

  return (
    <div className="product" onClick={toggleRedirectProductPage}>
      {redirectToProductPage && <Navigate to={`/product?id=${product.id}`} />}
      
      <img className="productimg" src={require(`../../assets/img/product/${product.img_link}`)} alt="product" />
      <div className="producttitle">{product.title.split(" ").length > 5 ? product.title.split(" ").slice(0, 5).join(" ") + "..." : product.title}</div>
      <div className="productprice">{formatRupiah(product.price)}</div>
      <div className="productrating">
        <div className="stars">{product.rating}</div>
        <div className="totalsells">{product.total_sales} Terjual</div>
      </div>

      <div className="productlocation">{product.location}</div>

      <button onClick={handleAddToCart} className="buttonbuy">
        add to cart
      </button>
    </div>
  );
}
