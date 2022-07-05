import React from 'react'

export default function LoginButton() {
  return (
    <div>
        <button className='loginbutton' type="button" data-bs-toggle="modal" data-bs-target="#login-modal">
            Login
        </button>
    </div>
  )
}
