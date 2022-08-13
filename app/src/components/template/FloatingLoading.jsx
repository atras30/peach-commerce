import React from "react";
import "../../assets/css/floating_loading.css";

export default function FloatingLoading({description}) {
  return (
    <div className="floating-loading p-1 px-2 shadow-sm border border-1 border-dark position-fixed rounded d-flex justify-content-center align-items-center gap-2">
      <div className="spinner-border spinner-border-sm" role="status"></div>
      <div>{description}</div>
    </div>
  );
}
