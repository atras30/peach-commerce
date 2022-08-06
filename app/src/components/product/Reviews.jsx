import React from "react";
import Review from "./Review";

export default function Reviews({product, fetchProduct, printStars}) {
  return (
    <div className="review-container">
      <div className="review-title text-uppercase mb-2">
        {product ? (
          <>
            Semua Ulasan <span className="fw-bold">({product?.total_reviews})</span>
          </>
        ) : null}
      </div>

      {product?.reviews?.map((review) => (
        <Review fetchProduct={fetchProduct} review={review} key={review.id} printStars={printStars} />
      ))}
    </div>
  );
}
