import React from "react";
import {useEffect} from "react";
import {formatDistance} from "date-fns";
import {useNavigate} from "react-router-dom";

export default function UserReply({comment}) {
  const navigate = useNavigate();

  useEffect(function () {
    // console.log(comment)
  }, []);

  function handleRedirectToUserPage() {
    navigate("/user?id=" + comment?.user?.id);
  }

  return (
    <div className="d-flex gap-4 mb-2 shadow-sm p-3 user-reply rounded">
      <div>
        <div className="d-flex align-items-center gap-2 user-user-reply p-1 rounded" onClick={handleRedirectToUserPage}>
          <img src={process.env.REACT_APP_BACKEND_BASE_URL + "/" + comment?.user?.profile_picture_path} alt="Profile Picture" width={"30px"} height={"30px"} className="profile-image rounded-circle border border-2 border-primary" />
          <div className="user-username fw-bold">{comment?.user?.username}</div>
        </div>
        <div className="text-muted">{formatDistance(new Date(comment?.user?.created_at), new Date(), {addSuffix: true})}</div>
      </div>

      <div
        className="text-break"
        dangerouslySetInnerHTML={{
          __html: comment.comment
            .split("\n")
            .map((sentence) => `<div style="min-height: 1em">${sentence}</div>`)
            .join(""),
        }}
      ></div>
    </div>
  );
}
