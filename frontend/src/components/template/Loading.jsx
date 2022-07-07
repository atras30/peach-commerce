import React from "react";

export default function Loading({description}) {
  return (
    <> 
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="loading-description">
        {description}
      </div>
    </>
  );
}
