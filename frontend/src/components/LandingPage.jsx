import React from 'react';

export default function LandingPage() {
  return (
    <div>
        <link rel="stylesheet" href='./assets/css/landingPage.css'/>

        <div className='header'>
            <div className='img-container'>
                <img className='logo' src='./assets/img/logo.png'/>
            </div>
            <div className='flexitem'>
                <div className='searchbar'>
                    <input className='search' type="text" placeholder='Search here . . .' />
                    <img className='logosearch' src='./assets/img/search-icon.png'/>
                </div>
                <div className='faq'>
                    <img className='logofaq' src='./assets/img/faq.png'/>
                </div>
                <div className='loginbutton'>
                    <button className='login'>
                        <p className='loginn'>LOGIN</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
