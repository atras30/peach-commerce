import React from 'react'

export default function LoginButton() {
  return (
    <div>
        <button className='loginbutton d-flex align-items-center' type="button" data-bs-toggle="modal" data-bs-target="#login-modal">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            <div>Login</div>
        </button>
    </div>
  )
}
