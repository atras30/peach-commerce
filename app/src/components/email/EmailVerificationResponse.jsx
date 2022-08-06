import React from 'react'
import {Link} from "react-router-dom"

export default function EmailVerificationResponse({responseMessage}) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column gap-2">
      <div>
        {responseMessage === "Email verified." ? "Your email has been successfully verified" : 
        responseMessage === "Token expired." ? "Your token has been expired, please issue a new token." :
        responseMessage}
      </div>

      <Link to="/user/profile" className='btn btn-primary text-white'>Go to Profile Page</Link>
    </div>
  )
}
