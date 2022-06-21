import React from 'react'
import {Link} from 'react-router-dom';

export default function Login() {
  return (
    <div>
      Login
      <Link to="/" className='img-logo-wrapper'>
          <img className='logo' src='./assets/img/logo.png' alt="Peach Commerce Logo"/>  
      </Link>
    </div>
  )
}
