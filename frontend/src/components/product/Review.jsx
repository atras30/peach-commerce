import React from "react";

export default function Review({review, printStars}) {
  return (
    <div className="review bordered d-flex gap-3 rounded shadow-sm p-3 mb-2">
      <i className="bi bi-person-circle"></i>

      <div className="user-information">
        <div className="user-username fw-bold">{review?.user?.username}</div>
        <div className="user-timestamp text-muted mb-3">1 minggu yang lalu</div>

        <button type="button" className="rounded shadow-sm px-2 py-1 reply-review-button container-fluid">
          Balas Ulasan Ini
        </button>
      </div>

      <div className="user-comment">
        <div className="star-rating">
          {review?.rating} {printStars(review?.rating)}
        </div>
        <div className="star-rating">{review?.review}</div>
      </div>
    </div>
  );
}
