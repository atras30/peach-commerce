import React from "react";
import {useRef} from "react";
import {useEffect} from "react";
import UserReply from "./UserReply";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {useUserContext, useHelperContext} from "../../provider/ContextProvider";

export default function Review({review, printStars, fetchProduct}) {
  const replyReviewButton = useRef(null);
  const replySection = useRef(null);
  const inputReply = useRef(null);
  const {authenticatedUser} = useUserContext();
  const {toast} = useHelperContext();
  const cookies = new Cookies();

  useEffect(function () {
    // console.log(review);
  }, []);

  function handleReplyToggle() {
    replyReviewButton.current.classList.toggle("show");
    replySection.current.classList.toggle("show");
  }

  function handleReplyToggleWithCheck() {
    if (!authenticatedUser) {
      const button = document.querySelector(".loginbutton");
      button.click();
      return toast.fire({
        icon: "error",
        title: "You must be logged in to reply another user's comment",
      });
    } else if (authenticatedUser?.email_verified_at === null) {
      return toast.fire({
        icon: "error",
        title: "Your email is not verified yet.",
      });
    }
    
    handleReplyToggle();
  }

  function handleReply() {
    axios
      .post(
        `/api/products/reviews/comments`,
        {
          product_review_id: review.id,
          comment: inputReply.current.value,
          user_id: authenticatedUser.id,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        inputReply.current.value = "";
        toast.fire({
          icon: "success",
          title: response.data.message,
        });
        fetchProduct();
        handleReplyToggle();
      })
      .catch((error) => {
        toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  }

  return (
    <div className="review rounded shadow p-3 mb-2">
      <div className="user-information d-flex gap-5 mb-2">
        <div className="d-flex flex-column">
          <i className="bi bi-person-circle"></i>
          <div className="user-username fw-bold">{review?.user?.username}</div>
          <div className="user-timestamp text-muted mb-3">1 minggu yang lalu</div>
        </div>

        <div className="user-comment">
          <div className="star-rating">
            {review?.rating} {printStars(review?.rating)}
          </div>
          <div className="star-rating">{review?.review}</div>
        </div>
      </div>

      <div className="user-replies-container">
        {review?.comments?.map((comment) => (
          <UserReply key={comment.id} comment={comment}></UserReply>
        ))}
      </div>

      <div className="reply-section-container">
        <button type="button" ref={replyReviewButton} onClick={handleReplyToggleWithCheck} className="rounded show shadow-sm px-2 py-1 w-100 reply-button mb-2">
          Balas Ulasan Ini
        </button>

        <div className="form-floating reply-section position-relative" ref={replySection}>
          <button type="button" onClick={handleReplyToggle} className="btn-close position-absolute translate-middle close-button" aria-label="Close"></button>
          <textarea ref={inputReply} className="form-control w-100 mb-2" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
          <label htmlFor="floatingTextarea2">Comment</label>
          <div className="d-flex justify-content-end">
            <button className="btn reply-review-button" onClick={handleReply}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
