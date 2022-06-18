import React from 'react'

export default function LandingPage() {
  return (
    <div>
        <link rel="stylesheet" href='./assets/css/landingPage.css'/>

        <div className='header'>
            <img className='logo' src='./assets/img/logo.png'/>
            <div className='searchbar'>
                <input className='search' type="text" placeholder='Search here . . .' />
                <img className='logosearch' src='./assets/img/search-icon.png'/>
            </div>
            <div className='faq'>
                <img className='logofaq' src='./assets/img/faq.png'/>
                <p className='faqq'>FAQ</p>
            </div>
            <div className='loginbutton'>
                <button className='login'>
                    <p className='loginn'>LOGIN</p>
                </button>
            </div>
        </div>
    </div>
  )
}
