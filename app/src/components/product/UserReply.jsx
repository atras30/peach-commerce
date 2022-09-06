import React from "react";
import {useEffect, useRef, useState} from "react";
import {formatDistance} from "date-fns";
import {useNavigate} from "react-router-dom";
import "../../assets/css/userReply.css";
import axios from "axios";
import Cookies from "universal-cookie";

export default function UserReply({comment}) {
  const navigate = useNavigate();
  const userReplyModalButton = useRef(null);
  const [commentId, setCommentId] = useState(null);

  useEffect(function () {
    // console.log(comment)
  }, []);

  function handleRedirectToUserPage() {
    navigate("/user?id=" + comment?.user?.id);
  }

  function handleDeleteUserReply() {
    userReplyModalButton.current.click();
    setCommentId(comment.id);
  }

  function confirmDeleteUserReply() {
    console.log(commentId);
    // axios.delete(`/api/products/reviews/comments/${commentId}`, {
    //   headers: {
    //     Authorization: new Cookies().get("Authorization")
    //   }
    // })
    // .then(response => console.log(response))
    // .catch(error => console.log(error));
  }

  return (
    <div className="d-flex gap-4 mb-2 shadow-sm p-3 user-reply rounded position-relative">
      <button onClick={handleDeleteUserReply} type="button" class="btn-close position-absolute user-reply-close-button" aria-label="Close"></button>
      <div>
        <div className="d-flex align-items-center gap-2 user-user-reply p-1 rounded" onClick={handleRedirectToUserPage}>
          <img
            src={process.env.REACT_APP_BACKEND_BASE_URL + "/" + (comment?.user?.profile_picture_path ? comment?.user?.profile_picture_path : "assets/peach_coin_logo.png")}
            alt="Profile Picture"
            width={"30px"}
            height={"30px"}
            className="profile-image rounded-circle border border-2 border-primary"
          />
          <div className="user-username fw-bold">{comment?.user?.username}</div>
        </div>
        <div className="text-muted">{formatDistance(new Date(comment?.user?.created_at), new Date(), {addSuffix: true})}</div>
      </div>

      <div className="text-break">
        {comment.comment.split("\n").map((eachSentence) => {
          return <div>{eachSentence}</div>;
        })}
      </div>

      <button ref={userReplyModalButton} type="button" class="btn btn-primary d-none user-reply-modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch modal
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content shadow border border-2 border-secondary">
            <div class="modal-header">
              <h5 class="modal-title text-center" id="exampleModalLabel">
                Are you sure wanted to delete this reply ?
              </h5>
            </div>
            <div class="modal-footer">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="btn btn-danger" onClick={confirmDeleteUserReply}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
