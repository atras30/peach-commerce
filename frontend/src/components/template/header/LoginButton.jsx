import React from 'react'

export default function LoginButton() {
  return (
    <div>
        <button className='loginbutton d-flex align-items-center m-0 px-2' type="button" data-bs-toggle="modal" data-bs-target="#login-modal">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            <div>Login</div>
        </button>
    </div>
  )
}
