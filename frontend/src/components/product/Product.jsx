import React from "react";
import {useEffect} from "react";

export default function Product({product}) {
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

  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <div className="product-card d-flex gap-4">
      <div className="product-image-container">
        <img src={require(`../../assets/img/product/${product.img_link}`)} alt="Product Image" className="img-fluid rounded product-image" />
      </div>

      <div className="product-information">
        <div className="product-title">{product.title}</div>
        <div className="product-sales">
          {product.rating} {printStars(product.rating)} | {product.total_reviews} Penilaian | {product.total_sales} Terjual
        </div>
        <div className="discounted-price">{applyDiscount(product.price)}</div>
        {product.discount === 0 ? null : (
          <div className="d-flex gap-2">
            <div className="product-discount">{product.discount}%</div>
            <div className="product-pric text-decoration-line-through">{formatRupiah(product.price)}</div>
          </div>
        )}

        <div className="product-details">Details</div>
        <div className="product-description">
          <pre>{product.description}</pre>
        </div>
        <div className="button-container d-flex gap-3">
          <button className="w-50 buttonbuy">Masukkan Keranjang</button>
          <button className="w-50 buttonbuy">Beli Sekarang</button>
        </div>
      </div>
    </div>
  );
}
