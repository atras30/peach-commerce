import React from "react";
import {useState} from "react";
import "../../assets/css/product.css";
import {Navigate} from "react-router-dom";

export default function Product({product}) {
  const [redirectToProductPage, setRedirectToProductPage] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    window.location.href = "/product/add-product";
  };

  function applyDiscount(bilangan) {
    bilangan = parseInt(bilangan - bilangan * (product.discount / 100));
    return formatRupiah(bilangan);
  }

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
    setRedirectToProductPage((prevValue) => !prevValue);
  };

  return (
    <div className="product shadow lh-sm" onClick={toggleRedirectProductPage}>
      {redirectToProductPage && <Navigate to={`/product?id=${product.id}`} />}

      <img className="productimg mb-2" src={require(`../../assets/img/product/${product.img_link}`)} alt="product" />
      <div className="producttitle mb-2 fw-bold">{product.title.split(" ").length > 5 ? product.title.split(" ").slice(0, 5).join(" ") + "..." : product.title}</div>
      <div className="productprice mb-2">{applyDiscount(product.price)}</div>
      {product.discount === 0 ? null : (
        <div className="d-flex gap-2 align-items-center">
          <div className="product-discount alert alert-danger p-0 px-1 m-0 fw-bold text-danger">{product.discount}%</div>
          <div className="product-price text-decoration-line-through">{formatRupiah(product.price)}</div>
        </div>
      )}

      <div className="productrating mb-2">
        <div className="stars">{product.rating}</div>
        <div className="totalsells">{product.total_sales} Terjual</div>
      </div>

      <div className="productlocation">{product.location}</div>

      <button onClick={handleAddToCart} className="buttonbuy p-0 m-0 container-fluid">
        add to cart
      </button>
    </div>
  );
}
