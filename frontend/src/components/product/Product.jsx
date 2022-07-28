import React from "react";
import {useEffect} from "react";
import Cookies from "universal-cookie";
import {useUserContext} from "../../provider/ContextProvider";
import {useToastContext} from "../../provider/ContextProvider";
import Reviews from "./Reviews"
import axios from "axios";

export default function Product({product, fetchProduct}) {
  const cookies = new Cookies();
  const {authenticatedUser, checkAuthenticatedUser} = useUserContext();
  const Toast = useToastContext();

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

  function applyDiscount(bilangan) {
    bilangan = parseInt(bilangan - bilangan * (product.discount / 100));
    return formatRupiah(bilangan);
  }

  function printStars(number) {
    if (Math.round(number) == 0) return "★";

    let stars = "";

    for (let i = 0; i < Math.round(number); i++) stars += "★";

    return stars;
  }

  async function handleAddToCart() {
    return axios
      .post(
        "/api/shopping-cart",
        {
          user_id: authenticatedUser.id,
          product_id: product.id,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        checkAuthenticatedUser();

        if(response.data.message === "created") return Toast.fire({
          icon: "success",
          title: `Product berhasil dimasukkan ke keranjang kamu`,
        });

        return Toast.fire({
          icon: "success",
          title: `Product berhasil dikeluarkan dari keranjang kamu`,
        });
      })
      .catch((error) => {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: `${error}`,
        });
      });
  }

  useEffect(() => {
    // console.log(authenticatedUser.shopping_carts.map(each => each.product_id).includes())
  }, []);

  return (
    <div className="product-card mb-3">
      <div className="product-image-container">
        <img src={require(`../../assets/img/product/${product.img_link}`)} alt="Product Image" className="img-fluid rounded shadow product-image img-thumbnail" />
      </div>
      
      <div className="product-information mb-3">
        <div className="product-title fs-3 fw-bold mb-3">{product.title}</div>
        <div className="product-sales mb-3">
          <span className="fw-bold">{product.rating}</span> {printStars(product.rating)} | <span className="fw-bold">{product.total_reviews}</span> Penilaian | <span className="fw-bold">{product.total_sales}</span> Terjual
        </div>
        <div className="discounted-price fw-bold fs-2">{applyDiscount(product.price)}</div>

        <div className="mb-3">
          {product.discount === 0 ? null : (
            <div className="d-flex gap-2 align-items-center">
              <div className="product-discount alert alert-danger p-0 px-1 m-0 fw-bold text-danger">{product.discount}%</div>
              <div className="product-price text-decoration-line-through">{formatRupiah(product.price)}</div>
            </div>
          )}
        </div>

        <div className="product-details text-decoration-underline fs-5 mb-2">Details</div>
        <div
          className="product-description mb-3"
          dangerouslySetInnerHTML={{
            __html: product.description
              .split("\n")
              .map((desc) => `<p>${desc}</p>`)
              .join(""),
          }}
        ></div>
        <div className="button-container d-flex gap-3">
          <button onClick={handleAddToCart} className="w-50 buttonbuy p-0 m-0 fw-bold">
            {authenticatedUser?.shopping_carts.map(each => each.product_id).includes(product.id) ?
              <div className="d-inline-block"><i className="bi bi-cart me-2"></i>Keluarkan Dari Keranjang</div>
            :
              <div className="d-inline-block"><i className="bi bi-cart me-2"></i>Masukkan Keranjang</div>
            }
           
          </button>
          <button className="w-50 buttonbuy p-0 m-0 fw-bold">
            <i className="bi bi-bag"></i> Beli Sekarang
          </button>
        </div>
      </div>

      <Reviews product={product} fetchProduct={fetchProduct} printStars={printStars}/>
      
    </div>
  );
}
