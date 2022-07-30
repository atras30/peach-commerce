import React from "react";
import "../../assets/css/product.css";
import {useNavigate} from "react-router-dom";
import {useHelperContext, useUserContext} from "../../provider/ContextProvider";
import axios from "axios";

export default function UserProduct({product}) {
  const navigate = useNavigate();
  const {cookies, toast} = useHelperContext();
  const {getLoggedInUser} = useUserContext();

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
    navigate(`/product?id=${product.id}`);
  };

  function handleEditProduct(e) {
    e.stopPropagation();
    navigate(`/product/edit-product?id=${product.id}`);
  }

  function handleDeleteProduct(e) {
    e.stopPropagation();

    const url = `api/products/${product?.id}`;
    const config = {
      headers: {
        Authorization: cookies.get("Authorization"),
      },
    };

    axios
      .delete(url, config)
      .then((response) => {
        toast.fire({
          icon: "success",
          title: response.data.message,
        });
      })
      .catch((response) => {
        toast.fire({
          icon: "error",
          title: response.response.data.message,
        });
      })
      .finally(() => {
        getLoggedInUser();
      });
  }

  return (
    <div className="product shadow lh-sm d-flex flex-column justify-content-between gap-3" onClick={toggleRedirectProductPage}>
      <div>
        <img className="productimg mb-2" src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${product.img_link}`} alt="product" />
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
      </div>

      <div className="d-flex justify-content-center align-items-center flex-column gap-1">
        <button onClick={handleDeleteProduct} className="buttonbuy w-100">
          <div className="d-inline-block">
            <i className="bi bi-trash"></i> Delete Product
          </div>
        </button>

        <button onClick={handleEditProduct} className="buttonbuy w-100">
          <div className="d-inline-block">
            <i className="bi bi-pencil-square"></i> Edit Product
          </div>
        </button>
      </div>
    </div>
  );
}
